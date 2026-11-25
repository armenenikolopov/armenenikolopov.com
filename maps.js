/* Draws the expedition maps from geo.js (outlines) and trips.js (TRIPS). */
(function(){
  var S=100, NS='http://www.w3.org/2000/svg', G=null, drawers=[];
  function dec(s,q){var a=s.split(','),p=[],x=0,y=0;for(var i=0;i<a.length;i+=2){x+=+a[i];y+=+a[i+1];p.push([x/q,y/q]);}return p;}
  function boxed(list,q){return list.map(function(s){var p=dec(s,q),b=[1e9,1e9,-1e9,-1e9];for(var i=0;i<p.length;i++){var v=p[i];if(v[0]<b[0])b[0]=v[0];if(v[1]<b[1])b[1]=v[1];if(v[0]>b[2])b[2]=v[0];if(v[1]>b[3])b[3]=v[1];}return {p:p,b:b};});}
  if(window.GEO){var q=GEO.q;G={land:boxed(GEO.land,q),lakes:boxed(GEO.lakes||[],q),borders:boxed(GEO.borders,q),states:boxed(GEO.states,q),rivers:boxed(GEO.rivers,q),world:boxed(GEO.world||[],GEO.wq||20)};}
  var TRIPS=window.TRIPS||[];

  function esc(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');}
  function X(F,lon){return (lon-F.lon0)*F.k*S;}
  function Y(F,lat){return (F.lat1-lat)*S;}

  function frameFor(pts,aspect,minSpan,pad){
    var lo=[1e9,-1e9],la=[1e9,-1e9];
    pts.forEach(function(p){la[0]=Math.min(la[0],p[0]);la[1]=Math.max(la[1],p[0]);lo[0]=Math.min(lo[0],p[1]);lo[1]=Math.max(lo[1],p[1]);});
    var cLat=(la[0]+la[1])/2,cLon=(lo[0]+lo[1])/2,k=Math.cos(cLat*Math.PI/180);
    var w=Math.max((lo[1]-lo[0])*k,minSpan)*(1+pad),h=Math.max(la[1]-la[0],minSpan)*(1+pad);
    if(w/h<aspect)w=h*aspect;else h=w/aspect;
    return {lon0:cLon-w/k/2,lon1:cLon+w/k/2,lat0:cLat-h/2,lat1:cLat+h/2,k:k,w:w*S,h:h*S};
  }
  function pathOf(list,F,close){
    var d='';
    for(var j=0;j<list.length;j++){
      var o=list[j],b=o.b;
      if(b[2]<F.lon0||b[0]>F.lon1||b[3]<F.lat0||b[1]>F.lat1) continue;
      for(var i=0;i<o.p.length;i++){d+=(i?'L':'M')+X(F,o.p[i][0]).toFixed(1)+' '+Y(F,o.p[i][1]).toFixed(1);}
      if(close) d+='Z';
    }
    return d;
  }
  function base(F,withStates){
    var s='<rect class="m-sea" x="0" y="0" width="'+F.w.toFixed(1)+'" height="'+F.h.toFixed(1)+'"/>';
    if(G){
      s+='<path class="m-land" d="'+pathOf(G.land,F,true)+'"/>';
      s+='<path class="m-lake" d="'+pathOf(G.lakes,F,true)+'"/>';
      if(withStates) s+='<path class="m-state" d="'+pathOf(G.states,F,false)+'"/>';
      s+='<path class="m-river" d="'+pathOf(G.rivers,F,false)+'"/>';
      s+='<path class="m-border" d="'+pathOf(G.borders,F,false)+'"/>';
    }
    return s;
  }
  function niceKm(maxKm){var c=[5,10,20,25,50,100,200,250,500];for(var i=c.length-1;i>=0;i--){if(c[i]<=maxKm)return c[i];}return 5;}
  function scale(F,u,fs){
    var kmPerUnit=111.32/S,km=niceKm(F.w*0.3*kmPerUnit),len=km/kmPerUnit,x0=10*u,y0=F.h-10*u;
    return '<path class="m-scale" d="M'+x0+' '+(y0-3*u)+'V'+y0+'H'+(x0+len)+'V'+(y0-3*u)+'"/>'+
           '<text class="m-scale-t" x="'+(x0+len+4*u)+'" y="'+y0+'" font-size="'+fs.toFixed(2)+'">'+km+' km</text>';
  }
  /* Road geometry from routes.js: [lon,lat] points for the leg ending at stop i, or null */
  var RC={};
  function road(t,i,a,b){
    var key=t.id+':'+i;
    if(key in RC) return RC[key];
    var r=window.ROUTES&&window.ROUTES[key],out=null;
    if(r){
      var near=function(p,q){return Math.abs(p[0]-q[0])<0.02&&Math.abs(p[1]-q[1])<0.02;};
      if(near(r.from,a.ll)&&near(r.to,b.ll)){out={p:dec(r.d,window.ROUTES_Q||500),ga:!!r.ga,gb:!!r.gb};}
    }
    RC[key]=out; return out;
  }
  function legs(t){
    var res=[];
    for(var i=1;i<t.stops.length;i++){
      var b=t.stops[i],leg=b.leg||'line';
      if(leg==='none') continue;
      var a=t.stops[b.from!=null?b.from:i-1];
      res.push({a:a,b:b,air:leg==='air',boat:leg==='boat',bow:b.bow,r:(leg==='air'||leg==='boat')?null:road(t,i,a,b)});
    }
    return res;
  }
  /* small airplane, nose pointing along +x, about 13 units across */
  var PLANE='M6.5 0L2.5-1.1L-0.6-6.2H-2.3L-0.9-1.1H-4.1L-5.6-3.1H-6.7L-5.9 0L-6.7 3.1H-5.6L-4.1 1.1H-0.9L-2.3 6.2H-0.6L2.5 1.1Z';
  function lines(t,F,u){
    u=u||1;
    var s='';
    legs(t).forEach(function(L){
      var a=L.a,b=L.b;
      if(L.r){
        var p=L.r.p,d='';
        for(var j=0;j<p.length;j++) d+=(j?'L':'M')+X(F,p[j][0]).toFixed(1)+' '+Y(F,p[j][1]).toFixed(1);
        s+='<path class="m-route" d="'+d+'"/>';
        if(L.r.ga) s+='<line class="m-route m-air" x1="'+X(F,a.ll[1]).toFixed(1)+'" y1="'+Y(F,a.ll[0]).toFixed(1)+'" x2="'+X(F,p[0][0]).toFixed(1)+'" y2="'+Y(F,p[0][1]).toFixed(1)+'"/>';
        if(L.r.gb){var e=p[p.length-1];s+='<line class="m-route m-air" x1="'+X(F,e[0]).toFixed(1)+'" y1="'+Y(F,e[1]).toFixed(1)+'" x2="'+X(F,b.ll[1]).toFixed(1)+'" y2="'+Y(F,b.ll[0]).toFixed(1)+'"/>';}
      } else if(L.air||L.boat){
        var x1=X(F,a.ll[1]),y1=Y(F,a.ll[0]),x2=X(F,b.ll[1]),y2=Y(F,b.ll[0]),dx=x2-x1,dy=y2-y1;
        /* perpendicular to the direction of travel; flights always bow upward (north) */
        var px=dy,py=-dx;
        if(L.air&&py>0){px=-px;py=-py;}
        var k=L.air?0.28:(L.bow||0);
        var cx=(x1+x2)/2+px*k,cy=(y1+y2)/2+py*k;
        s+='<path class="m-route '+(L.air?'m-air':'m-boat')+'" d="M'+x1.toFixed(1)+' '+y1.toFixed(1)+'Q'+cx.toFixed(1)+' '+cy.toFixed(1)+' '+x2.toFixed(1)+' '+y2.toFixed(1)+'"/>';
        if(L.air){
          /* plane at the middle of the arc, or near the end when the flight starts off the map */
          var tt=0.5;
          if(a.frame===false){
            var mg=12*u;
            for(var tq=0.5;tq<0.99;tq+=0.01){var r1=1-tq,qx=r1*r1*x1+2*r1*tq*cx+tq*tq*x2,qy=r1*r1*y1+2*r1*tq*cy+tq*tq*y2;
              if(qx>mg&&qx<F.w-mg&&qy>mg&&qy<F.h-mg){tt=(tq+1)/2;break;}}
          }
          var m1=1-tt;
          var mx=m1*m1*x1+2*m1*tt*cx+tt*tt*x2,my=m1*m1*y1+2*m1*tt*cy+tt*tt*y2;
          var ang=Math.atan2(m1*(cy-y1)+tt*(y2-cy),m1*(cx-x1)+tt*(x2-cx))*180/Math.PI;
          s+='<path class="m-plane" transform="translate('+mx.toFixed(1)+' '+my.toFixed(1)+') rotate('+ang.toFixed(1)+') scale('+(0.95*u).toFixed(3)+')" d="'+PLANE+'"/>';
        }
      } else {
        s+='<line class="m-route" x1="'+X(F,a.ll[1]).toFixed(1)+'" y1="'+Y(F,a.ll[0]).toFixed(1)+'" x2="'+X(F,b.ll[1]).toFixed(1)+'" y2="'+Y(F,b.ll[0]).toFixed(1)+'"/>';
      }
    });
    return s;
  }
  function dots(t,F,u){
    return t.stops.map(function(p){return '<circle class="'+(p.site?'m-site':'m-stop')+'" cx="'+X(F,p.ll[1]).toFixed(1)+'" cy="'+Y(F,p.ll[0]).toFixed(1)+'" r="'+(3.2*u).toFixed(2)+'"/>';}).join('');
  }
  function labels(t,F,u,fs){
    var s='';
    t.stops.forEach(function(p){
      var x=X(F,p.ll[1]),y=Y(F,p.ll[0]),o=7*u,anchor='start',dx=o,dy=fs*0.35;
      if(p.lp==='l'){anchor='end';dx=-o;}
      else if(p.lp==='t'){anchor='middle';dx=0;dy=-o;}
      else if(p.lp==='b'){anchor='middle';dx=0;dy=o+fs*0.8;}
      var tw=p.n.length*fs*(p.it?0.5:0.62),m=3*u;
      if(anchor==='start'&&x+dx+tw>F.w-m){anchor='end';dx=-o;}
      else if(anchor==='end'&&x+dx-tw<m){anchor='start';dx=o;}
      else if(anchor==='middle'){var cx=x;if(cx-tw/2<m)cx=m+tw/2;if(cx+tw/2>F.w-m)cx=F.w-m-tw/2;dx=cx-x;}
      s+='<text class="m-label'+(p.it?' it':'')+'" x="'+(x+dx).toFixed(1)+'" y="'+(y+dy).toFixed(1)+'" font-size="'+fs.toFixed(2)+'" text-anchor="'+anchor+'" style="stroke-width:'+(3*u).toFixed(2)+'">'+esc(p.n)+'</text>';
    });
    return s;
  }
  function star(cx,cy,r){
    var d='';
    for(var i=0;i<10;i++){var a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*0.45:r;d+=(i?'L':'M')+(cx+rr*Math.cos(a)).toFixed(1)+' '+(cy+rr*Math.sin(a)).toFixed(1);}
    return d+'Z';
  }

  /* Overview of Central America and northwestern South America */
  var OV={lon0:-86,lon1:-73.4,lat0:-12.7,lat1:11.2};OV.k=Math.cos(0.4*Math.PI/180);OV.w=(OV.lon1-OV.lon0)*OV.k*S;OV.h=(OV.lat1-OV.lat0)*S;
  var COUNTRIES=[['COSTA RICA',10.45,-83.95],['PANAMA',8.15,-80.75],['COLOMBIA',3.6,-75.6],['ECUADOR',-1.6,-78.4],['PERU',-6.6,-78.6]];

  function inOV(t){return t.pin[1]>=OV.lon0&&t.pin[1]<=OV.lon1&&t.pin[0]>=OV.lat0&&t.pin[0]<=OV.lat1;}
  function pinSvg(t,i,F,r,opts){
    return '<a class="pin" href="'+esc(opts.base+'#'+t.id)+'" data-i="'+i+'" tabindex="-1"><title>'+esc(t.when+' · '+t.title)+'</title><path class="m-star" d="'+star(X(F,t.pin[1]),Y(F,t.pin[0]),r)+'"/></a>';
  }
  /* World locator: trips outside the Neotropics detail map, plus a box showing where the detail map is */
  var WF={lon0:-128,lon1:58,lat0:-18,lat1:50,k:1};WF.w=(WF.lon1-WF.lon0)*S;WF.h=(WF.lat1-WF.lat0)*S;
  function drawWorld(opts,px){
    var F=WF,u=F.w/px,fs=10*u,s='<svg xmlns="'+NS+'" viewBox="0 0 '+F.w.toFixed(1)+' '+F.h.toFixed(1)+'" aria-hidden="true">';
    s+='<rect class="m-sea" x="0" y="0" width="'+F.w.toFixed(1)+'" height="'+F.h.toFixed(1)+'"/>';
    if(G) s+='<path class="m-land" d="'+pathOf(G.world,F,true)+'"/>';
    s+='<rect class="m-frame" x="'+X(F,OV.lon0).toFixed(1)+'" y="'+Y(F,OV.lat1).toFixed(1)+'" width="'+((OV.lon1-OV.lon0)*S).toFixed(1)+'" height="'+((OV.lat1-OV.lat0)*S).toFixed(1)+'"/>';
    s+='<text class="m-country" x="'+(X(F,OV.lon1)+5*u).toFixed(1)+'" y="'+(Y(F,OV.lat0)-3*u).toFixed(1)+'" font-size="'+(fs*0.85).toFixed(2)+'">DETAIL BELOW</text>';
    TRIPS.forEach(function(t,i){if(!inOV(t))s+=pinSvg(t,i,F,7.5*u,opts);});
    return s+'</svg>';
  }
  function drawOverview(el,opts){
    var F=OV,px=el.clientWidth||380,u=F.w/px,fs=10*u;
    var s=TRIPS.some(function(t){return !inOV(t);})?'<div class="world">'+drawWorld(opts,px)+'</div>':'';
    s+='<svg xmlns="'+NS+'" viewBox="0 0 '+F.w.toFixed(1)+' '+F.h.toFixed(1)+'" aria-hidden="true">'+base(F,false);
    COUNTRIES.forEach(function(c){s+='<text class="m-country" x="'+X(F,c[2]).toFixed(1)+'" y="'+Y(F,c[1]).toFixed(1)+'" font-size="'+(fs*0.9).toFixed(2)+'" text-anchor="middle">'+c[0]+'</text>';});
    s+='<text class="m-sea-label" x="'+X(F,-82.6).toFixed(1)+'" y="'+Y(F,2.5).toFixed(1)+'" font-size="'+(fs*1.3).toFixed(2)+'" text-anchor="middle">Pacific Ocean</text>';
    s+='<text class="m-sea-label" x="'+X(F,-77.6).toFixed(1)+'" y="'+Y(F,10.4).toFixed(1)+'" font-size="'+(fs*1.3).toFixed(2)+'" text-anchor="middle">Caribbean Sea</text>';
    if(opts.routes) TRIPS.forEach(function(t,i){s+='<g class="rt">'+lines(t,F,u*0.7)+'</g>';});
    TRIPS.forEach(function(t,i){if(inOV(t))s+=pinSvg(t,i,F,7.5*u,opts);});
    s+=scale(F,u,fs*0.9)+'</svg>';
    el.innerHTML=s;
  }

  /* Star map plus a linked list of trips. base = '' on the expeditions page, 'expeditions.html' elsewhere.
     opts.item(t,i), if given, returns the HTML inside each list item. */
  function atlas(mapEl,listEl,opts){
    opts=opts||{};opts.base=opts.base||'';
    listEl.innerHTML=TRIPS.map(function(t,i){
      return '<li data-i="'+i+'">'+(opts.item?opts.item(t,i):'<a href="'+esc(opts.base+'#'+t.id)+'"><span class="when">'+esc(t.when)+'</span><span class="where">'+esc(t.title)+' <span class="country">· '+esc(t.country)+'</span></span></a>')+'</li>';
    }).join('');
    function mark(i,on){
      var p=mapEl.querySelector('.pin[data-i="'+i+'"]'),li=listEl.querySelector('li[data-i="'+i+'"]');
      if(p)p.classList.toggle('on',on); if(li)li.classList.toggle('on',on);
    }
    function wire(){
      [].forEach.call(mapEl.querySelectorAll('.pin'),function(p){
        var i=p.getAttribute('data-i');
        p.addEventListener('mouseenter',function(){mark(i,true);});
        p.addEventListener('mouseleave',function(){mark(i,false);});
      });
    }
    [].forEach.call(listEl.querySelectorAll('li'),function(li){
      var i=li.getAttribute('data-i');
      li.addEventListener('mouseenter',function(){mark(i,true);});
      li.addEventListener('mouseleave',function(){mark(i,false);});
      li.addEventListener('focusin',function(){mark(i,true);});
      li.addEventListener('focusout',function(){mark(i,false);});
    });
    function draw(){drawOverview(mapEl,opts);wire();}
    draw(); drawers.push(draw);
  }

  /* Route map for one trip */
  function route(el,t){
    function draw(){
      var pts=t.stops.filter(function(p){return p.frame!==false;}).map(function(p){return p.ll;});
      legs(t).forEach(function(L){if(L.r&&L.a.frame!==false&&L.b.frame!==false)L.r.p.forEach(function(q){pts.push([q[1],q[0]]);});});
      var F=frameFor(pts,1,t.span||0.55,0.35);
      var px=el.clientWidth||260,u=F.w/px,fs=10*u;
      /* refs: places shown for orientation only (grey, not part of the route) */
      var refs=(t.refs||[]).map(function(r){return {n:r.n,ll:r.ll,lp:r.lp};});
      var rs=refs.map(function(r){return '<circle class="m-ref" cx="'+X(F,r.ll[1]).toFixed(1)+'" cy="'+Y(F,r.ll[0]).toFixed(1)+'" r="'+(2.4*u).toFixed(2)+'"/>';}).join('');
      var rl=labels({stops:refs},F,u,fs*0.92).replace(/class="m-label/g,'class="m-label m-ref-label');
      el.innerHTML='<svg xmlns="'+NS+'" viewBox="0 0 '+F.w.toFixed(1)+' '+F.h.toFixed(1)+'" role="img" aria-label="Route map: '+esc(t.stops.map(function(p){return p.n;}).join(', '))+'">'+
        base(F,true)+rs+rl+lines(t,F,u)+dots(t,F,u)+labels(t,F,u,fs)+scale(F,u,fs*0.9)+'</svg>';
    }
    draw(); drawers.push(draw);
  }

  var lastW=window.innerWidth,tm=0;
  window.addEventListener('resize',function(){
    if(Math.abs(window.innerWidth-lastW)<40) return;
    lastW=window.innerWidth;clearTimeout(tm);
    tm=setTimeout(function(){drawers.forEach(function(d){d();});},150);
  });

  window.FM={atlas:atlas,route:route,esc:esc};
})();
