/* ---------------------------------------------------------------
   EXPEDITIONS. Edit this file to add trips and photos; both pages
   (the home page map and expeditions.html) are drawn from it.
   Newest first. To add a trip, copy one block.

   id      short name used in links (letters, digits, hyphens)
   cover   which photo (counting from 0) shows in the list of trips
   summary one line for the list of trips
   pin     [latitude, longitude] of the star on the overview map
   stops   places for the route map, in the order visited:
             n    name
             ll   [latitude, longitude]  (south and west are negative)
             lp   label side: 'r', 'l', 't' or 'b'
             leg  how you got there: 'line' (default, by road),
                  'air' (dashed arc with a plane), 'boat' (dotted)
                  or 'none' (no line)
             bow  boat legs only: how far the line bows sideways
                  (e.g. -0.2 or 0.2; 0 = straight)
             from index of the stop the leg starts from
                  (default: the previous stop; 0 = the first stop)
             frame false = leave this stop out of the small map's frame
                  (e.g. a distant airport the trip flew in from)
             site true = open circle (a reserve or collecting site)
             it   true = italic label (species names)
   span    optional: minimum width of the small map in degrees (default 0.55)
   refs    optional: places shown in grey for orientation only, [{n, ll, lp}]
   text    may link a phrase to a photo: <a data-p="2">phrase</a> opens photo 2 (counting from 0)
   photos  [{src:'photos/peru-2024/01.jpg', caption:'…'}, …]
           a video: {video:'photos/x/clip.mp4', src:'photos/x/clip.jpg' (poster), caption:'…'}

   Road legs follow the roads stored in routes.js. A new leg with no
   stored road is drawn as a straight line until routes.js is updated.
---------------------------------------------------------------- */
window.TRIPS = [
  { id:'colombia-2026-05', cover:1, summary:'With the mobile plant lab. A boat to Arusí, and <em>Monstera minima</em>.', when:'Apr–May 2026', country:'Colombia', title:'The Pacific coast and the Chocó lowland rainforest',
    pin:[5.7074,-77.2711],
    text:'Fieldwork with a mobile plant lab I built for field analysis and specimen preparation, including a propane plant dryer based on a <a href="https://www.mobot.org/MOBOT/molib/fieldtechbook/reading.shtml">1979 field design</a>. From Jardín over the Western Cordillera to Carmen de Atrato and Quibdó. From Quibdó I flew to Nuquí on the Pacific coast, which has no road access, and went down the coast by boat to Arusí. There I collected <a data-p="1"><em>Monstera minima</em></a>, a species that had not been collected this century. Then the lowland rainforest around Lloró and Istmina, and west to Puerto Meluk.',
    stops:[ {n:'Jardín', ll:[5.5991,-75.8192], lp:'r'},
            {n:'Carmen de Atrato', ll:[5.899,-76.143], lp:'r'},
            {n:'Quibdó', ll:[5.6913,-76.6531], lp:'b'},
            {n:'Nuquí', ll:[5.7074,-77.2711], lp:'t', leg:'air', from:2},
            {n:'Lloró', ll:[5.497,-76.546], lp:'r', from:2},
            {n:'Istmina', ll:[5.1593,-76.6855], lp:'r', from:2},
            {n:'Puerto Meluk', ll:[5.1927,-76.9513], lp:'b'},
            {n:'Arusí', ll:[5.5953,-77.4742], lp:'b', leg:'boat', from:3, bow:-0.18} ],
    photos:[ {src:'photos/colombia-2026-05/01.jpg', caption:'Students Juan Pablo and Darwin with <em>Monstera pinnatipartita</em>'},
             {src:'photos/colombia-2026-05/02.jpg', caption:'<em>Monstera minima</em>'},
             {src:'photos/colombia-2026-05/03.jpg', caption:'With a <em>Xanthosoma</em> sp.'},
             {src:'photos/colombia-2026-05/04.jpg', caption:'Coca leaves'},
             {src:'photos/colombia-2026-05/05.jpg', caption:'An <em>Anthurium</em> inflorescence'},
             {src:'photos/colombia-2026-05/06.jpg', caption:'A <em>Miconia</em> sp. in bloom'} ] },

  { id:'colombia-2026-03', cover:4, summary:'Camp at 3,200 m, with Tom Croat.', when:'Mar 2026', country:'Colombia', title:'Páramo at La Mesenia–Paramillo',
    pin:[5.496,-75.8892],
    text:'A drive from Bogotá to Medellín and Jardín for the 2026 Exploratory Research Expedition to the La Mesenia–Paramillo Nature Reserve, in the Western Cordillera above Jardín where Antioquia, Risaralda and Caldas meet. We worked from the páramo down through high-elevation rainforest and cloud forest, <a data-p="4">camping at 3,200 m</a>.',
    stops:[ {n:'Bogotá', ll:[4.711,-74.072], lp:'b'},
            {n:'Medellín', ll:[6.244,-75.581], lp:'r'},
            {n:'Jardín', ll:[5.5991,-75.8192], lp:'r'},
            {n:'La Mesenia–Paramillo', ll:[5.496,-75.8892], lp:'b', site:true} ],
    photos:[ {src:'photos/colombia-2026-03/01.jpg', caption:'<em>Guzmania</em> sp.'},
             {src:'photos/colombia-2026-03/02.jpg', caption:'With Tom Croat'},
             {src:'photos/colombia-2026-03/03.jpg', caption:'A <em>Philodendron</em> sp. inflorescence'},
             {src:'photos/colombia-2026-03/04.jpg', caption:'A <em>Belolonchium</em> leaf'},
             {src:'photos/colombia-2026-03/05.jpg', caption:'Camp at 3,200 m'},
             {video:'photos/colombia-2026-03/downpour.mp4', src:'photos/colombia-2026-03/downpour.jpg', caption:'A torrential downpour at camp'},
             {src:'photos/colombia-2026-03/06.jpg', caption:'<em>Begonia lehmannii</em>'},
             {src:'photos/colombia-2026-03/07.jpg', caption:'With Tom Croat and a packed car'},
             {src:'photos/colombia-2026-03/08.jpg', caption:'Leaving the reserve'},
             {src:'photos/colombia-2026-03/09.jpg', caption:'The landscape over Jardín'},
             {src:'photos/colombia-2026-03/10.jpg', caption:'The expedition team'} ] },

  { id:'colombia-2025-10-choco', cover:0, summary:'<em>Zamia pyrophylla</em>, and a talk in Quibdó.', when:'Oct 2025', country:'Colombia', title:'Quibdó, Yutó and Lloró',
    pin:[5.5308,-76.6361],
    text:'After San José del Palmar I flew from Medellín to Quibdó and worked in the Chocó lowlands around Yutó and Lloró. I gave a talk in Quibdó.',
    stops:[ {n:'Medellín', ll:[6.244,-75.581], lp:'b'},
            {n:'Quibdó', ll:[5.6913,-76.6531], lp:'l', leg:'air'},
            {n:'Yutó', ll:[5.5308,-76.6361], lp:'l', from:1},
            {n:'Lloró', ll:[5.497,-76.546], lp:'r', from:1} ],
    photos:[ {src:'photos/colombia-2025-10-choco/01.jpg', caption:'With Juan Pablo and <em>Zamia pyrophylla</em>, a cycad endemic to the Quibdó area, described only in 2010'} ] },

  { id:'colombia-2025-10-palmar', cover:0, summary:'Aroid specialist on a road project, for UTCH and INVÍAS.', when:'Oct 2025', country:'Colombia', title:'Cloud forest at San José del Palmar',
    pin:[4.895,-76.235],
    text:'The biology program of the Universidad Tecnológica del Chocó (UTCH) invited me to take part, as the aroid specialist, in a project for the Ministry of Transport (INVÍAS) along a road through highly sensitive tropical cloud forest around San José del Palmar, which I reached by road from Medellín. The town later became the epicentre of the <a href="https://es.wikipedia.org/wiki/Terremoto_de_Colombia_de_2026">magnitude 7.4 earthquake of August 2026</a>.',
    stops:[ {n:'Medellín', ll:[6.244,-75.581], lp:'r'},
            {n:'San José del Palmar', ll:[4.895,-76.235], lp:'b'} ],
    photos:[ {src:'photos/colombia-2025-10-palmar/01.jpg', caption:'With a giant <em>Calomystrium</em> leaf'},
             {src:'photos/colombia-2025-10-palmar/02.jpg', caption:'<em>Begonia</em> sp.'},
             {src:'photos/colombia-2025-10-palmar/03.jpg', caption:'An ELN flag: we were squarely in the territory of the left-wing guerrilla group'},
             {src:'photos/colombia-2025-10-palmar/04.jpg', caption:'Preparing specimens with students from UTCH'},
             {src:'photos/colombia-2025-10-palmar/05.jpg', caption:'A massive <em>Anthurium</em>'},
             {src:'photos/colombia-2025-10-palmar/06.jpg', caption:'With another massive <em>Anthurium</em>'} ] },

  { id:'colombia-2025-08', cover:2, summary:'Wasps, a landslide, and the lost locality of <em>Philodendron luxurians</em>.', when:'Aug–Sep 2025', country:'Colombia', title:'The Western Cordillera and the Chocó lowlands',
    pin:[5.899,-76.143],
    text:'From Medellín over the Western Cordillera to Carmen de Atrato, and down into the Chocó lowlands around Quibdó and south to Yutó. It was an eventful trip. While retrieving the <a data-p="3">two-pound inflorescences</a> of a new species of <em>Monstera</em>, which I’m now describing, I was <a data-p="8">stung by wasps</a> and went into anaphylactic shock. Medical staff in Yutó and a brilliant doctor in Quibdó pulled me through. Later, heavy rains brought down <a data-p="9">a landslide</a> that cut the main road into the region, with the only other road closed for political reasons, and I was stuck in Quibdó for nearly two weeks. I also rediscovered the place <a data-p="6"><em>Philodendron luxurians</em></a> comes from, a locality whose identity had been lost for a century, and gave <a data-p="10">a talk in Quibdó</a>.',
    stops:[ {n:'Medellín', ll:[6.244,-75.581], lp:'r'},
            {n:'Carmen de Atrato', ll:[5.899,-76.143], lp:'r'},
            {n:'Quibdó', ll:[5.6913,-76.6531], lp:'l'},
            {n:'Yutó', ll:[5.5308,-76.6361], lp:'l'} ],
    photos:[ {src:'photos/colombia-2025-08/01.jpg', caption:'Collecting along the road'},
             {src:'photos/colombia-2025-08/08.jpg', caption:'The car, packed with plant presses'},
             {src:'photos/colombia-2025-08/09.jpg', caption:'The same truck, a little top-heavy'},
             {src:'photos/colombia-2025-08/02.jpg', caption:'An aroid inflorescence, back at base'},
             {src:'photos/colombia-2025-08/03.jpg', caption:'An inflorescence, opened up'},
             {src:'photos/colombia-2025-08/10.jpg', caption:'A wild peace lily (<em>Spathiphyllum</em>)'},
             {src:'photos/colombia-2025-08/04.jpg', caption:'<em>Philodendron luxurians</em>'},
             {video:'photos/colombia-2025-08/atrato-boat.mp4', src:'photos/colombia-2025-08/atrato-boat.jpg', caption:'By motorboat up the Río Atrato'},
             {src:'photos/colombia-2025-08/05.jpg', caption:'In the ambulance after the wasp stings'},
             {src:'photos/colombia-2025-08/06.jpg', caption:'Clearing a landslide on the road'},
             {src:'photos/colombia-2025-08/07.jpg', caption:'Giving a talk in Quibdó'} ] },

  { id:'armenia-2024', cover:1, summary:'A refugium for plant communities from the Tertiary.', when:'Sep 2024', country:'Armenia', title:'Khosrov Forest, Ararat Province',
    pin:[40.0373,44.9263], span:0.9,
    text:'Fieldwork in Ararat Province near the Khosrov Forest State Reserve. The forests here are a vital ecological refugium, preserving relict plant communities whose origins trace back to the Tertiary Period (about 66 to 2.6 million years ago).',
    stops:[ {n:'Khosrov Forest State Reserve', ll:[40.0373,44.9263], lp:'b', site:true} ],
    refs:[ {n:'Yerevan', ll:[40.1777,44.5126], lp:'b'},
           {n:'Garni', ll:[40.1175,44.7341], lp:'t'} ],
    photos:[ {src:'photos/armenia-2024/04.jpg', caption:'Dry hills near the Khosrov reserve'},
             {src:'photos/armenia-2024/01.jpg', caption:'Columnar basalt in the gorge'},
             {src:'photos/armenia-2024/03.jpg', caption:'Papery flowers on a spiny cushion plant'},
             {src:'photos/armenia-2024/02.jpg', caption:'Seed pods and a woolly rosette among the rocks'} ] },

  { id:'peru-2024', cover:0, summary:'Two new <em>Anthurium</em>, and <em>Rhodospatha enikolopovii</em>.', when:'Jul–Aug 2024', country:'Peru', title:'Tingo María',
    pin:[-9.2984,-76.0003],
    text:'I landed in Lima and flew on to Tingo María in Huánuco, on the eastern slopes of the Andes at the western edge of the Amazon basin. This trip led to a paper describing two new species, <em>Anthurium tenuilaminum</em> and <em>Anthurium obtusicataphyllum</em>, the first in a series on the Araceae of Huánuco; the map marks their type localities. I also found a plant that Tom Croat, a specialist in the aroid family, later named after me: <a data-p="0"><em>Rhodospatha enikolopovii</em></a>. Along the way I became friendly with some of the locals <a data-p="1">cutting a road through the rainforest</a>.',
    stops:[ {n:'Lima', ll:[-12.0219,-77.1143], lp:'r', frame:false},
            {n:'Tingo María', ll:[-9.2984,-76.0003], lp:'l', leg:'air'},
            {n:'A. tenuilaminum', ll:[-9.2219,-75.8295], lp:'b', from:1, site:true, it:true},
            {n:'A. obtusicataphyllum', ll:[-9.4250,-75.9767], lp:'b', from:1, site:true, it:true} ],
    photos:[ {src:'photos/peru-2024/05.jpg', caption:'<em>Rhodospatha enikolopovii</em>, named after me'},
             {src:'photos/peru-2024/06.jpg', caption:'With the crew cutting a road through the forest'},
             {src:'photos/peru-2024/01.jpg', caption:'On the riverbank'},
             {src:'photos/peru-2024/02.jpg', caption:'On the trail with a collection'},
             {src:'photos/peru-2024/03.jpg', caption:'Aroid leaves in the forest'},
             {src:'photos/peru-2024/04.jpg', caption:'A dried specimen'} ] },

  { id:'colombia-2024', cover:9, summary:'With Elena, Edi Moya and Kamimila.', when:'Mar–Apr 2024', country:'Colombia', title:'Frontino to the Chocó',
    pin:[6.7722,-76.1312],
    text:'Across the Western Cordillera from Medellín to Frontino and Carmen de Atrato, then down into the Chocó lowlands at Quibdó, Yutó, Lloró and Istmina, with field research assistant <a data-p="0">Elena</a>, translator <a data-p="5">Edi Moya</a> and Kamimila.',
    stops:[ {n:'Medellín', ll:[6.244,-75.581], lp:'r'},
            {n:'Frontino', ll:[6.7722,-76.1312], lp:'r'},
            {n:'Carmen de Atrato', ll:[5.899,-76.143], lp:'r'},
            {n:'Quibdó', ll:[5.6913,-76.6531], lp:'l'},
            {n:'Lloró', ll:[5.497,-76.546], lp:'r'},
            {n:'Istmina', ll:[5.1593,-76.6855], lp:'l'},
            {n:'Yutó', ll:[5.5308,-76.6361], lp:'l', leg:'none'} ],
    photos:[ {src:'photos/colombia-2024/01.jpg', caption:'Field research assistant Elena with a giant <em>Anthurium</em> sp.'},
             {src:'photos/colombia-2024/02.jpg', caption:'Scarab beetles, the pollinators of <em>Philodendron tenue</em>'},
             {src:'photos/colombia-2024/03.jpg', caption:'Montane view of Frontino'},
             {src:'photos/colombia-2024/04.jpg', caption:'Late night with <em>Anthurium atramentarium</em>'},
             {src:'photos/colombia-2024/05.jpg', caption:'1940s taxis in Carmen de Atrato'},
             {src:'photos/colombia-2024/06.jpg', caption:'Translator Edi Moya with a giant <em>Xanthosoma</em>'},
             {src:'photos/colombia-2024/07.jpg', caption:'Carmen de Atrato'},
             {src:'photos/colombia-2024/08.jpg', caption:'The 2024 Colombia crew: Kamimila, Edi and Elena'},
             {src:'photos/colombia-2024/09.jpg', caption:'ELN territory'},
             {src:'photos/colombia-2024/10.jpg', caption:'Motorcycle repair in Yutó: “El Científico”'},
             {src:'photos/colombia-2024/11.jpg', caption:'A <em>Monstera</em> sp. in the Chocó lowlands'} ] },

  { id:'costa-rica-2024', cover:1, summary:'Private and national reserves, compared.', when:'Mar 2024', country:'Costa Rica', title:'San José, the Río Pacuare and Uvita',
    pin:[9.942,-83.420],
    text:'A drive from San José to Turrialba and <a data-p="1">the Río Pacuare</a> by Barbilla National Park, with a visit to <a data-p="0">Brian Kubicki’s Costa Rican Amphibian Research Center</a> at Guayacán, then south over the Cerro de la Muerte to Uvita on the Pacific coast. Part of the work was a comparative analysis of private and national nature reserves.',
    stops:[ {n:'San José', ll:[9.928,-84.091], lp:'l'},
            {n:'Turrialba', ll:[9.904,-83.684], lp:'b'},
            {n:'Barbilla N.P.', ll:[9.942,-83.420], lp:'b', site:true},
            {n:'Uvita', ll:[9.1731,-83.7364], lp:'l', from:1},
            {n:'Guayacán', ll:[10.0355,-83.548], lp:'l', leg:'none', site:true} ],
    photos:[ {src:'photos/costa-rica-2024/01.jpg', caption:'Visiting Brian Kubicki’s Costa Rican Amphibian Research Center with Tom Croat'},
             {src:'photos/costa-rica-2024/02.jpg', caption:'Crossing the Río Pacuare'},
             {src:'photos/costa-rica-2024/03.jpg', caption:'<em>Begonia</em> sp.'},
             {src:'photos/costa-rica-2024/04.jpg', caption:'With Tom Croat and Marco Fonseca Cedeño in front of two <em>Philodendron</em> species near Uvita'},
             {src:'photos/costa-rica-2024/05.jpg', caption:'<em>Philodendron verrucosum</em>'} ] },

  { id:'costa-rica-2023', cover:1, summary:'<em>Monstera tenuis</em>, and driving in the rain.', when:'Nov 2023', country:'Costa Rica', title:'Carara, Puntarenas Province',
    pin:[9.7901,-84.5709],
    text:'A drive from San José to the central Pacific coast: wet forest in Carara National Park and around Jacó, and drier forest around Manuel Antonio.',
    stops:[ {n:'San José', ll:[9.928,-84.091], lp:'r'},
            {n:'Carara N.P.', ll:[9.7901,-84.5709], lp:'l', site:true},
            {n:'Jacó', ll:[9.6156,-84.6281], lp:'l'},
            {n:'Manuel Antonio', ll:[9.39,-84.14], lp:'l'} ],
    photos:[ {src:'photos/costa-rica-2023/01.jpg', caption:'Through the mud at the forest edge'},
             {src:'photos/costa-rica-2023/04.jpg', caption:'<em>Monstera tenuis</em>'},
             {src:'photos/costa-rica-2023/02.jpg', caption:'A small aroid inflorescence, glasses for scale'},
             {src:'photos/costa-rica-2023/05.jpg', caption:'With a collected aroid'},
             {src:'photos/costa-rica-2023/03.jpg', caption:'On the river by boat'},
             {video:'photos/costa-rica-2023/rain-drive.mp4', src:'photos/costa-rica-2023/rain-drive.jpg', caption:'Driving in the rain'} ] },

  { id:'panama-2023', cover:2, summary:'Forest in the watershed that feeds the canal.', when:'Nov 2023', country:'Panama', title:'Chagres',
    pin:[9.3498,-79.403],
    text:'Forest around Chagres National Park, in the watershed that feeds the Panama Canal.',
    stops:[ {n:'Panama City', ll:[8.983,-79.517], lp:'b'},
            {n:'Chagres N.P.', ll:[9.3498,-79.403], lp:'r', site:true} ],
    photos:[ {src:'photos/panama-2023/03.jpg', caption:'Cloud forest thick with bromeliads'},
             {src:'photos/panama-2023/02.jpg', caption:'A bromeliad in flower'},
             {src:'photos/panama-2023/04.jpg', caption:'<em>Philodendron fragrantissimum</em> inflorescence'},
             {src:'photos/panama-2023/01.jpg', caption:'A shelter on the ridge'} ] },

  { id:'us-mexico-2023', cover:0, summary:'Desert plants, and what migrants left behind.', when:'2023', country:'United States', title:'The California–Mexico border',
    pin:[32.6176,-116.1897], span:1.6,
    text:'A brief trip to the desert borderlands between California and Mexico. Along the way we came across many <a data-p="3">belongings left behind by migrants</a> on their journey.',
    stops:[ {n:'US–Mexico border', ll:[32.6176,-116.1897], lp:'b', site:true} ],
    refs:[ {n:'San Diego', ll:[32.7157,-117.1638], lp:'r'} ],
    photos:[ {src:'photos/us-mexico-2023/03.jpg', caption:'<em>Geraea canescens</em>'},
             {src:'photos/us-mexico-2023/04.jpg', caption:'<em>Cleomella arborea</em>, in flower and fruit'},
             {src:'photos/us-mexico-2023/01.jpg', caption:'A woolly plant in dry grass'},
             {src:'photos/us-mexico-2023/02.jpg', caption:'Belongings left behind by migrants'} ] }
];
