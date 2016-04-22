'use strict';

var _ = require('underscore');
var DesiredTripStore = require('../stores/DesiredTripStore');
var AppDispatcher = require('../dispatchers/AppDispatcher');
const apiKey = '886e10690ad4421b96ee3f53945a84cd';

var stations = [{"stationName":"Abrahamsberg","stationUri":"abrahamsberg","stationLines":["MetroGreen"],"stationCentLon":"17.95275","stationCentLat":"59.33686","stationID":"9110","stationExits":[{"exitName":"Abrahemsberg","exitLon":"59.336434","exitLat":"17.952626"}]},{"stationName":"Akalla","stationUri":"akalla","stationLines":["MetroBlue"],"stationCentLon":"17.91328","stationCentLat":"59.41546","stationID":"9300","stationExits":[{"exitName":"Akalla torg","exitLon":"59.415441","exitLat":"17.913369"},{"exitName":"Sibeliusgången/Nystadsgatan","exitLon":"59.413863","exitLat":"17.917736"}]},{"stationName":"Alby","stationUri":"alby","stationLines":["MetroRed"],"stationCentLon":"17.84660","stationCentLat":"59.23919","stationID":"9282","stationExits":[{"exitName":"Alby Centrum","exitLon":"59.238789","exitLat":"17.84479"},{"exitName":"Albyberget","exitLon":"59.239969","exitLat":"17.846164"}]},{"stationName":"Alvik","stationUri":"alvik","stationLines":["MetroGreen"],"stationCentLon":"17.98062","stationCentLat":"59.33294","stationID":"9112","stationExits":[{"exitName":"Alviks torg","exitLon":"59.333042","exitLat":"17.980167"},{"exitName":"Tranebergsvägen","exitLon":"59.333469","exitLat":"17.983879"}]},{"stationName":"Aspudden","stationUri":"aspudden","stationLines":["MetroRed"],"stationCentLon":"18.00218","stationCentLat":"59.30569","stationID":"9293","stationExits":[{"exitName":"Aspudden","exitLon":"59.30642","exitLat":"18.001142"}]},{"stationName":"Axelsberg","stationUri":"axelsberg","stationLines":["MetroRed"],"stationCentLon":"17.97741","stationCentLat":"59.30403","stationID":"9291","stationExits":[{"exitName":"Axelsberg","exitLon":"59.304540","exitLat":"17.974860"}]},{"stationName":"Bagarmossen","stationUri":"bagarmossen","stationLines":["MetroGreen"],"stationCentLon":"18.13350","stationCentLat":"59.27659","stationID":"9141","stationExits":[{"exitName":"Bagarmossen","exitLon":"59.27628","exitLat":"18.131207"}]},{"stationName":"Bandhagen","stationUri":"bandhagen","stationLines":["MetroGreen"],"stationCentLon":"18.04827","stationCentLat":"59.27055","stationID":"9163","stationExits":[{"exitName":"Bandhagen","exitLon":"59.269949","exitLat":"18.049346"}]},{"stationName":"Bergshamra","stationUri":"bergshamra","stationLines":["MetroRed"],"stationCentLon":"18.03832","stationCentLat":"59.38011","stationID":"9202","stationExits":[{"exitName":"Bergshamra centrum","exitLon":"59.38155","exitLat":"18.0363"},{"exitName":"Gamla vägen","exitLon":"59.379409","exitLat":"18.038059"}]},{"stationName":"Björkhagen","stationUri":"bjorkhagen","stationLines":["MetroGreen"],"stationCentLon":"18.11607","stationCentLat":"59.29135","stationID":"9143","stationExits":[{"exitName":"Björkhagen","exitLon":"59.291362","exitLat":"18.115672"}]},{"stationName":"Blackeberg","stationUri":"blackeberg","stationLines":["MetroGreen"],"stationCentLon":"17.88476","stationCentLat":"59.34956","stationID":"9105","stationExits":[{"exitName":"Vinjettgatan (vid Direkten)","exitLon":"59.348204","exitLat":"17.883484"},{"exitName":"Vinjettgatan (vid 7-Eleven)","exitLon":"59.348142","exitLat":"17.883199"},{"exitName":"Blackebergs torg","exitLon":"59.347917","exitLat":"17.883672"}]},{"stationName":"Blåsut","stationUri":"blasut","stationLines":["MetroGreen"],"stationCentLon":"18.08995","stationCentLat":"59.28791","stationID":"9187","stationExits":[{"exitName":"Blåsut","exitLon":"59.290101","exitLat":"18.09092"}]},{"stationName":"Bredäng","stationUri":"bredang","stationLines":["MetroRed"],"stationCentLon":"17.93339","stationCentLat":"59.29473","stationID":"9289","stationExits":[{"exitName":"Bredängstorget","exitLon":"59.29478","exitLat":"17.934333"},{"exitName":"Bredängshallen","exitLon":"59.294802","exitLat":"17.934086"}]},{"stationName":"Brommaplan","stationUri":"brommaplan","stationLines":["MetroGreen"],"stationCentLon":"17.93786","stationCentLat":"59.33829","stationID":"9109","stationExits":[{"exitName":"Brommaplan","exitLon":"59.33835","exitLat":"17.9388"}]},{"stationName":"Danderyds Sjukhus","stationUri":"danderyds-sjukhus","stationLines":["MetroRed"],"stationCentLon":"18.04260","stationCentLat":"59.39005","stationID":"9201","stationExits":[{"exitName":"Danderyds sjukhus","exitLon":"59.392298","exitLat":"18.040152"},{"exitName":"Mörbyskolan Vendevägen","exitLon":"59.392161","exitLat":"18.041686"},{"exitName":"Mörbylund Inverness","exitLon":"59.3899","exitLat":"18.042115"},{"exitName":"Bussterminal","exitLon":"59.390113","exitLat":"18.04293"}]},{"stationName":"Duvbo","stationUri":"duvbo","stationLines":["MetroBlue"],"stationCentLon":"17.96519","stationCentLat":"59.36780","stationID":"9324","stationExits":[{"exitName":"Duvbo","exitLon":"59.367822","exitLat":"17.964942"}]},{"stationName":"Enskede Gård","stationUri":"enskede-gard","stationLines":["MetroGreen"],"stationCentLon":"18.07035","stationCentLat":"59.28963","stationID":"9167","stationExits":[{"exitName":"Enskede gård","exitLon":"59.28959","exitLat":"18.07026"}]},{"stationName":"Farsta","stationUri":"farsta","stationLines":["MetroGreen"],"stationCentLon":"18.10274","stationCentLat":"59.23566","stationID":"9180","stationExits":[{"exitName":"Farsta centrum","exitLon":"59.243289","exitLat":"18.09312"},{"exitName":"Kroppaplan","exitLon":"59.24351","exitLat":"18.09341"}]},{"stationName":"Farsta Strand","stationUri":"farsta-strand","stationLines":["MetroGreen"],"stationCentLon":"18.10274","stationCentLat":"59.23566","stationID":"9180","stationExits":[{"exitName":"Farsta Strand","exitLon":"59.235601","exitLat":"18.101681"}]},{"stationName":"Fittja","stationUri":"fittja","stationLines":["MetroRed"],"stationCentLon":"17.86124","stationCentLat":"59.24795","stationID":"9283","stationExits":[{"exitName":"Fittja","exitLon":"59.247859","exitLat":"17.861162"}]},{"stationName":"Fridhemsplan","stationUri":"fridhemsplan","stationLines":["MetroBlue","MetroGreen"],"stationCentLon":"18.02913","stationCentLat":"59.33213","stationID":"9115","stationExits":[{"exitName":"St Eriksgatan 43T","exitLon":"59.334169","exitLat":"18.032146"},{"exitName":"St Eriksgatan 40A","exitLon":"59.334324","exitLat":"18.032580"},{"exitName":"St Eriksg./Fleming.","exitLon":"59.334399","exitLat":"18.032786"},{"exitName":"Drottningholmsvägen","exitLon":"59.33221","exitLat":"18.02897"},{"exitName":"Fridhemsgatan","exitLon":"59.332436","exitLat":"18.028839"},{"exitName":"Mariebergsgatan","exitLon":"59.334953","exitLat":"18.025167"}]},{"stationName":"Fruängen","stationUri":"fruangen","stationCentLon":"17.96545","stationCentLat":"59.28559","stationLines":["MetroRed","Bus"],"stationID":"9260","stationExits":[{"exitName":"Fruängsplan","exitLon":"59.28566","exitLat":"17.96499"},{"exitName":"Fruängstorget","exitLon":"59.28586","exitLat":"17.96479"}]},{"stationName":"Gamla Stan","stationUri":"gamla-stan","stationLines":["MetroGreen","MetroRed"],"stationCentLon":"18.06819","stationCentLat":"59.32301","stationID":"9193","stationExits":[{"exitName":"Riddarholmen","exitLon":"59.322962","exitLat":"18.066605"},{"exitName":"Munkbroleden Södermalm","exitLon":"59.323043","exitLat":"18.067613"},{"exitName":"Gamla Stan","exitLon":"59.323384","exitLat":"18.068162"}]},{"stationName":"Globen","stationUri":"globen","stationLines":["MetroGreen"],"stationCentLon":"18.07604","stationCentLat":"59.29366","stationID":"9168","stationExits":[{"exitName":"Slakthusområdet","exitLon":"59.293685","exitLat":"18.074859"},{"exitName":"Globenområdet","exitLon":"59.294479","exitLat":"18.07825"}]},{"stationName":"Gubbängen","stationUri":"gubbangen","stationLines":["MetroGreen"],"stationCentLon":"18.08278","stationCentLat":"59.26196","stationID":"9183","stationExits":[{"exitName":"Herrhagsvägen","exitLon":"59.264159","exitLat":"18.082069"},{"exitName":"Gubbängstorget","exitLon":"59.262174","exitLat":"18.082455"}]},{"stationName":"Gullmarsplan","stationUri":"gullmarsplan","stationLines":["MetroGreen"],"stationCentLon":"18.08093","stationCentLat":"59.29842","stationID":"9189","stationExits":[{"exitName":"Johanneshovsvägen","exitLon":"59.299113","exitLat":"18.080896"},{"exitName":"Gång mot Globen","exitLon":"59.298941","exitLat":"18.081330"},{"exitName":"Mot torget","exitLon":"59.299033","exitLat":"18.080483"}]},{"stationName":"Gärdet","stationUri":"gardet","stationLines":["MetroRed"],"stationCentLon":"18.10227","stationCentLat":"59.34808","stationID":"9221","stationExits":[{"exitName":"Hiss till Brantingsg.","exitLon":"59.34495","exitLat":"18.09834"},{"exitName":"Brantingsg./Askrikeg.","exitLon":"59.34468","exitLat":"18.09847"},{"exitName":"Värtavä./Sandhamnsg.","exitLon":"59.34781","exitLat":"18.10143"},{"exitName":"Hiss till Furusundsg.","exitLon":"59.347","exitLat":"18.09942"}]},{"stationName":"Hagsätra","stationUri":"hagsatra","stationLines":["MetroGreen"],"stationCentLon":"18.01665","stationCentLat":"59.26161","stationID":"9160","stationExits":[{"exitName":"Hagsätra","exitLon":"59.262289","exitLat":"18.013372"}]},{"stationName":"Hallonbergen","stationUri":"hallonbergen","stationLines":["MetroBlue"],"stationCentLon":"17.97019","stationCentLat":"59.37556","stationID":"9303","stationExits":[{"exitName":"Hallonbergen","exitLon":"59.37541","exitLat":"17.96929"}]},{"stationName":"Hallunda","stationUri":"hallunda","stationLines":["MetroRed"],"stationCentLon":"17.82594","stationCentLat":"59.24328","stationID":"9281","stationExits":[{"exitName":"Hallunda torg","exitLon":"59.24416","exitLat":"17.82604"},{"exitName":"Eriksberg","exitLon":"59.24265","exitLat":"17.82613"}]},{"stationName":"Hammarbyhöjden","stationUri":"hammarbyhojden","stationLines":["MetroGreen"],"stationCentLon":"18.10702","stationCentLat":"59.29470","stationID":"9144","stationExits":[{"exitName":"Ulricehamnsvägen","exitLon":"59.29499","exitLat":"18.10648"},{"exitName":"Finn Malmgrens plan","exitLon":"59.2949","exitLat":"18.10197"}]},{"stationName":"Hjulsta","stationUri":"hjulsta","stationLines":["MetroBlue"],"stationCentLon":"17.88563","stationCentLat":"59.39582","stationID":"9320","stationExits":[{"exitName":"Hjulsta","exitLon":"59.39618","exitLat":"17.888"}]},{"stationName":"Hornstull","stationUri":"hornstull","stationLines":["MetroRed"],"stationCentLon":"18.03423","stationCentLat":"59.31553","stationID":"9295","stationExits":[{"exitName":"Långholmsgatan/Högalidsgatan","exitLon":"59.31625","exitLat":"18.034013"},{"exitName":"Högalidsparken","exitLon":"59.316575","exitLat":"18.038637"},{"exitName":"Hornstull, korsningen vid Apoteket","exitLon":"59.315744","exitLat":"18.034209"},{"exitName":"Bergsunds strand","exitLon":"59.315703","exitLat":"18.03345"}]},{"stationName":"Husby","stationUri":"husby","stationLines":["MetroBlue"],"stationCentLon":"17.92705","stationCentLat":"59.41068","stationID":"9301","stationExits":[{"exitName":"Bergengatan","exitLon":"59.408152","exitLat":"17.928786"},{"exitName":"Trondheimsgatan/Husby centrum","exitLon":"59.409998","exitLat":"17.925889"}]},{"stationName":"Huvudsta","stationUri":"huvudsta","stationLines":["MetroBlue"],"stationCentLon":"17.98541","stationCentLat":"59.34965","stationID":"9327","stationExits":[{"exitName":"Bygatan","exitLon":"59.3496","exitLat":"17.98801"},{"exitName":"Huvudsta centrum","exitLon":"59.349821","exitLat":"17.985942"}]},{"stationName":"Hägerstensåsen","stationUri":"hagerstensasen","stationLines":["MetroRed"],"stationCentLon":"17.97718","stationCentLat":"59.29446","stationID":"9262","stationExits":[{"exitName":"Personnevägen","exitLon":"59.294287","exitLat":"17.976294"},{"exitName":"Hägerstensåsen","exitLon":"59.295558","exitLat":"17.979448"}]},{"stationName":"Hässelby Gård","stationUri":"hasselby-gard","stationLines":["MetroGreen"],"stationCentLon":"17.84340","stationCentLat":"59.36648","stationID":"9101","stationExits":[{"exitName":"Hässelby gård","exitLon":"59.36695","exitLat":"17.84337"}]},{"stationName":"Hässelby Strand","stationUri":"hasselby-strand","stationLines":["MetroGreen"],"stationCentLon":"17.83139","stationCentLat":"59.36087","stationID":"9100","stationExits":[{"exitName":"Hässelby strand","exitLon":"59.361064","exitLat":"17.832141"}]},{"stationName":"Högdalen","stationUri":"hogdalen","stationLines":["MetroGreen"],"stationCentLon":"18.04117","stationCentLat":"59.26312","stationID":"9162","stationExits":[{"exitName":"Högdalen","exitLon":"59.26336","exitLat":"18.0426"}]},{"stationName":"Hökarängen","stationUri":"hokarangen","stationLines":["MetroGreen"],"stationCentLon":"18.08277","stationCentLat":"59.25842","stationID":"9182","stationExits":[{"exitName":"Örbyleden","exitLon":"59.25794","exitLat":"18.082724"},{"exitName":"Russinvägen","exitLon":"59.256229","exitLat":"18.083754"}]},{"stationName":"Hötorget","stationUri":"hotorget","stationLines":["MetroGreen"],"stationCentLon":"18.06386","stationCentLat":"59.33552","stationID":"9119","stationExits":[{"exitName":"Kungsg vid Telia","exitLon":"59.33575","exitLat":"18.06412"},{"exitName":"Sergelg/Hötorget","exitLon":"59.334426","exitLat":"18.063744"},{"exitName":"Sveav/Malmskillnadsg","exitLon":"59.334393","exitLat":"18.064903"},{"exitName":"Malmskillnadsg","exitLon":"59.334557","exitLat":"18.065482"},{"exitName":"Kungsg/Sveav vid Adidas","exitLon":"59.335499","exitLat":"18.062972"},{"exitName":"Hötorget/Konserthuset","exitLon":"59.335324","exitLat":"18.063154"},{"exitName":"Kungsg vid Cervera","exitLon":"59.335603","exitLat":"18.064334"},{"exitName":"Sveav/Tunnelg","exitLon":"59.336587","exitLat":"18.062854"},{"exitName":"Sveav/Olof Palmes gata","exitLon":"59.336341","exitLat":"18.062446"}]},{"stationName":"Islandstorget","stationUri":"islandstorget","stationLines":["MetroGreen"],"stationCentLon":"17.89335","stationCentLat":"59.34641","stationID":"9106","stationExits":[{"exitName":"Islandstorget","exitLon":"59.346","exitLat":"17.89299"}]},{"stationName":"Johannelund","stationUri":"johannelund","stationLines":["MetroGreen"],"stationCentLon":"17.85537","stationCentLat":"59.36767","stationID":"9102","stationExits":[{"exitName":"Johannelund","exitLon":"59.368079","exitLat":"17.858158"}]},{"stationName":"Karlaplan","stationUri":"karlaplan","stationLines":["MetroRed"],"stationCentLon":"18.09209","stationCentLat":"59.33907","stationID":"9222","stationExits":[{"exitName":"Karlaplan Nordväst","exitLon":"59.338437","exitLat":"18.090255"},{"exitName":"Karlaplan Nordöst","exitLon":"59.338349","exitLat":"18.090953"},{"exitName":"Valhallav./Värtav.","exitLon":"59.340292","exitLat":"18.093849"},{"exitName":"Valhallav./Tessinparken","exitLon":"59.340729","exitLat":"18.093013"}]},{"stationName":"Kista","stationUri":"kista","stationLines":["MetroBlue"],"stationCentLon":"17.94259","stationCentLat":"59.40347","stationID":"9302","stationExits":[{"exitName":"Kista Galleria","exitLon":"59.402282","exitLat":"17.943689"},{"exitName":"Danmarksgatan","exitLon":"59.40206","exitLat":"17.94402"},{"exitName":"Köpenhamnsgatan","exitLon":"59.40366","exitLat":"17.94216"}]},{"stationName":"Kristineberg","stationUri":"kristineberg","stationLines":["MetroGreen"],"stationCentLon":"18.00589","stationCentLat":"59.33270","stationID":"9113","stationExits":[{"exitName":"Kristineberg","exitLon":"59.33289","exitLat":"18.00303"}]},{"stationName":"Kungsträdgården","stationUri":"kungstradgarden","stationLines":["MetroBlue"],"stationCentLon":"18.07386","stationCentLat":"59.32990","stationID":"9340","stationExits":[{"exitName":"Arsenalsgatan","exitLon":"59.330678","exitLat":"18.073851"},{"exitName":"Jakobsgatan/Regeringsgatan","exitLon":"59.330021","exitLat":"18.068991"}]},{"stationName":"Kärrtorp","stationUri":"karrtorp","stationLines":["MetroGreen"],"stationCentLon":"18.11573","stationCentLat":"59.28372","stationID":"9142","stationExits":[{"exitName":"Kärrtorp","exitLon":"59.28395","exitLat":"18.11473"}]},{"stationName":"Liljeholmen","stationUri":"liljeholmen","stationLines":["MetroRed"],"stationCentLon":"18.02481","stationCentLat":"59.31066","stationID":"9294","stationExits":[{"exitName":"Liljeholmstorget (inomhus)","exitLon":"59.310073","exitLat":"18.022192"},{"exitName":"Liljeholmsvägen/Tvärbana","exitLon":"59.310877","exitLat":"18.024251"},{"exitName":"Trekanten","exitLon":"59.31056","exitLat":"18.021601"},{"exitName":"Hissbana/Nybohov","exitLon":"59.308680","exitLat":"18.016616"},{"exitName":"Liljeholmstorget (utomhus)","exitLon":"59.310192","exitLat":"18.022118"},{"exitName":"Liljeholmsvägen Höger","exitLon":"59.310832","exitLat":"18.024180"},{"exitName":"Bussterminal","exitLon":"59.310102","exitLat":"18.022563"}]},{"stationName":"Mariatorget","stationUri":"mariatorget","stationLines":["MetroRed"],"stationCentLon":"18.06211","stationCentLat":"59.31701","stationID":"9297","stationExits":[{"exitName":"Torkel Knutssonsgatan","exitLon":"59.317251","exitLat":"18.057747"},{"exitName":"Mariatorget","exitLon":"59.316965","exitLat":"18.063292"}]},{"stationName":"Masmo","stationUri":"masmo","stationLines":["MetroRed"],"stationCentLon":"17.87896","stationCentLat":"59.24972","stationID":"9284","stationExits":[{"exitName":"Masmo","exitLon":"59.24979","exitLat":"17.881376"}]},{"stationName":"Medborgarplatsen","stationUri":"medborgarplatsen","stationLines":["MetroGreen"],"stationCentLon":"18.07639","stationCentLat":"59.31481","stationID":"1323","stationExits":[{"exitName":"Folkungagatan vid Göta Källare","exitLon":"59.314257","exitLat":"18.073019"},{"exitName":"Björns trädgård","exitLon":"59.315369","exitLat":"18.073075"},{"exitName":"Folkungagatan","exitLon":"59.314297","exitLat":"18.073812"}]},{"stationName":"Midsommarkransen","stationUri":"midsommarkransen","stationLines":["MetroRed"],"stationCentLon":"18.01198","stationCentLat":"59.30187","stationID":"9264","stationExits":[{"exitName":"Tegelbruksvägen/SL Sporthall","exitLon":"59.302509","exitLat":"18.010701"},{"exitName":"Svandammsvägen","exitLon":"59.30154","exitLat":"18.012471"}]},{"stationName":"Mälarhöjden","stationUri":"malarhojden","stationLines":["MetroRed"],"stationCentLon":"17.95654","stationCentLat":"59.30128","stationID":"9290","stationExits":[{"exitName":"Mälarhöjden","exitLon":"59.301058","exitLat":"17.957035"}]},{"stationName":"Mörby Centrum","stationUri":"morby-centrum","stationLines":["MetroRed"],"stationCentLon":"18.03627","stationCentLat":"59.39837","stationID":"9200","stationExits":[{"exitName":"Golfvägen","exitLon":"59.39826","exitLat":"18.03594"},{"exitName":"Mörbyplan","exitLon":"59.39843","exitLat":"18.03573"}]},{"stationName":"Näckrosen","stationUri":"nackrosen","stationLines":["MetroBlue"],"stationCentLon":"17.98375","stationCentLat":"59.36644","stationID":"9304","stationExits":[{"exitName":"Skogsbacken","exitLon":"59.368445","exitLat":"17.97963"},{"exitName":"Råsunda östra","exitLon":"59.3668","exitLat":"17.98431"},{"exitName":"Filmstaden","exitLon":"59.36637","exitLat":"17.98306"}]},{"stationName":"Odenplan","stationUri":"odenplan","stationLines":["MetroGreen"],"stationCentLon":"18.04909","stationCentLat":"59.34290","stationID":"9117","stationExits":[{"exitName":"Hiss på torget","exitLon":"59.34295","exitLat":"18.049593"},{"exitName":"Odenplan","exitLon":"59.342929","exitLat":"18.049947"},{"exitName":"Karlbergsvägen","exitLon":"59.343142","exitLat":"18.049904"},{"exitName":"Karlbergsvägen/Västmannagatan","exitLon":"59.342983","exitLat":"18.045537"},{"exitName":"Hiss Karlbergsvägen vid Hemköp","exitLon":"59.342989","exitLat":"18.045816"},{"exitName":"Karlbergsvägen vid Swedbank","exitLon":"59.343131","exitLat":"18.049572"}]},{"stationName":"Rinkeby","stationUri":"rinkeby","stationLines":["MetroBlue"],"stationCentLon":"17.92203","stationCentLat":"59.38903","stationID":"9322","stationExits":[{"exitName":"Rinkebystråket","exitLon":"59.38875","exitLat":"17.92884"},{"exitName":"Rinkebytorget","exitLon":"59.38831","exitLat":"17.92825"}]},{"stationName":"Ropsten","stationUri":"ropsten","stationLines":["MetroRed"],"stationCentLon":"18.10343","stationCentLat":"59.35800","stationID":"9220","stationExits":[{"exitName":"Bussar","exitLon":"59.35741","exitLat":"18.10276"},{"exitName":"Gasverksvägen","exitLon":"59.35745","exitLat":"18.102304"},{"exitName":"Artemisgatan","exitLon":"59.35557","exitLat":"18.09972"},{"exitName":"Jägmästargatan","exitLon":"59.35479","exitLat":"18.09809"}]},{"stationName":"Råcksta","stationUri":"racksta","stationLines":["MetroGreen"],"stationCentLon":"17.88113","stationCentLat":"59.35507","stationID":"9104","stationExits":[{"exitName":"Råcksta","exitLon":"59.35527","exitLat":"17.88216"}]},{"stationName":"Rådhuset","stationUri":"radhuset","stationLines":["MetroBlue"],"stationCentLon":"18.04424","stationCentLat":"59.33103","stationID":"9309","stationExits":[{"exitName":"Landstingshuset","exitLon":"59.329917","exitLat":"18.041868"},{"exitName":"Pipersg./Kungsholmsg.","exitLon":"59.331165","exitLat":"18.045977"},{"exitName":"Hantverkargatan","exitLon":"59.328724","exitLat":"18.047276"},{"exitName":"Kungsklippan","exitLon":"59.330273","exitLat":"18.046814"},{"exitName":"Polishuset","exitLon":"59.330355","exitLat":"18.041074"},{"exitName":"Rådhuset/Kungsholmsv.","exitLon":"59.33036","exitLat":"18.042094"}]},{"stationName":"Rådmansgatan","stationUri":"radmansgatan","stationLines":["MetroGreen"],"stationCentLon":"18.05753","stationCentLat":"59.34193","stationID":"9118","stationExits":[{"exitName":"Sveavägen/Rådmansgatan","exitLon":"59.340259","exitLat":"18.05926"},{"exitName":"Sveavägen/Rådmansgatan vid Jensens","exitLon":"59.340275","exitLat":"18.058788"},{"exitName":"Hiss till Sveavägen","exitLon":"59.340532","exitLat":"18.05853"},{"exitName":"Handelshögskolan vid Pressbyrån","exitLon":"59.342152","exitLat":"18.056931"},{"exitName":"Rehnsgatan","exitLon":"59.342374","exitLat":"18.057346"}]},{"stationName":"Rågsved","stationUri":"ragsved","stationLines":["MetroGreen"],"stationCentLon":"18.02661","stationCentLat":"59.25649","stationID":"9161","stationExits":[{"exitName":"Rågsved","exitLon":"59.25661","exitLat":"18.02769"}]},{"stationName":"Sandsborg","stationUri":"sandsborg","stationLines":["MetroGreen"],"stationCentLon":"18.08963","stationCentLat":"59.28483","stationID":"9186","stationExits":[{"exitName":"Sandsborg","exitLon":"59.28481","exitLat":"18.09216"}]},{"stationName":"Skanstull","stationUri":"skanstull","stationLines":["MetroGreen"],"stationCentLon":"18.07616","stationCentLat":"59.30794","stationID":"9190","stationExits":[{"exitName":"Allhelgonagatan","exitLon":"59.309853","exitLat":"18.075149"},{"exitName":"Ringvägen/Götgatan","exitLon":"59.308024","exitLat":"18.076608"},{"exitName":"Ringvägen","exitLon":"59.307844","exitLat":"18.075739"},{"exitName":"Ringvägen vid Forex","exitLon":"59.307504","exitLat":"18.0759"},{"exitName":"Hiss till Götgatan","exitLon":"59.308008","exitLat":"18.0762"}]},{"stationName":"Skogskyrkogården","stationUri":"skogskyrkogarden","stationLines":["MetroGreen"],"stationCentLon":"18.09269","stationCentLat":"59.27982","stationID":"9185","stationExits":[{"exitName":"Skogskyrkogården","exitLon":"59.279213","exitLat":"18.095255"}]},{"stationName":"Skärholmen","stationUri":"skarholmen","stationLines":["MetroRed"],"stationCentLon":"17.90948","stationCentLat":"59.27675","stationID":"9287","stationExits":[{"exitName":"Skärholmstorget","exitLon":"59.2767","exitLat":"17.90629"},{"exitName":"Skärholmsplan","exitLon":"59.27678","exitLat":"17.90867"}]},{"stationName":"Skärmarbrink","stationUri":"skarmarbrink","stationLines":["MetroGreen"],"stationCentLon":"18.09133","stationCentLat":"59.29749","stationID":"9188","stationExits":[{"exitName":"Skärmarbrink","exitLon":"59.29534","exitLat":"18.09049"}]},{"stationName":"Slussen","stationUri":"slussen","stationLines":["MetroGreen","MetroRed"],"stationCentLon":"18.07186","stationCentLat":"59.32028","stationID":"9192","stationExits":[{"exitName":"Götgatan","exitLon":"59.318165","exitLat":"18.071415"},{"exitName":"Södermalmstorg","exitLon":"59.319659","exitLat":"18.072263"},{"exitName":"Slussenterminalen","exitLon":"59.320152","exitLat":"18.072134"}]},{"stationName":"Sockenplan","stationUri":"sockenplan","stationLines":["MetroGreen"],"stationCentLon":"18.07153","stationCentLat":"59.28251","stationID":"9166","stationExits":[{"exitName":"Sockenplan","exitLon":"59.283427","exitLat":"18.070654"}]},{"stationName":"Stadshagen","stationUri":"stadshagen","stationLines":["MetroBlue"],"stationCentLon":"18.01829","stationCentLat":"59.33523","stationID":"9307","stationExits":[{"exitName":"S:t Görans sjukhus","exitLon":"59.33623","exitLat":"18.01841"},{"exitName":"Mariedalsvägen/Hornsberg","exitLon":"59.33833","exitLat":"18.01409"},{"exitName":"Kellgrensgatan","exitLon":"59.33686","exitLat":"18.01671"},{"exitName":"Stadshagens idrottsplats","exitLon":"59.33675","exitLat":"18.01779"}]},{"stationName":"Stora Mossen","stationUri":"stora-mossen","stationLines":["MetroGreen"],"stationCentLon":"17.96742","stationCentLat":"59.33478","stationID":"9111","stationExits":[{"exitName":"Stora Mossen","exitLon":"59.3343","exitLat":"17.96672"}]},{"stationName":"Sundbybergs Centrum","stationUri":"sundbybergs-centrum","stationLines":["MetroBlue"],"stationCentLon":"17.96925","stationCentLat":"59.36084","stationID":"9325","stationExits":[{"exitName":"Landsvägen/Pendeltåg","exitLon":"59.360748","exitLat":"17.9709"},{"exitName":"Lysvägen","exitLon":"59.360748","exitLat":"17.9709"},{"exitName":"Stationsgatan","exitLon":"59.363126","exitLat":"17.970453"},{"exitName":"Järnvägsgatan","exitLon":"59.360936","exitLat":"17.972566"}]},{"stationName":"Svedmyra","stationUri":"svedmyra","stationLines":["MetroGreen"],"stationCentLon":"18.06898","stationCentLat":"59.27818","stationID":"9165","stationExits":[{"exitName":"Svedmyra","exitLon":"59.27742","exitLat":"18.0674"}]},{"stationName":"Sätra","stationUri":"satra","stationLines":["MetroRed"],"stationCentLon":"17.92344","stationCentLat":"59.28448","stationID":"9288","stationExits":[{"exitName":"Sätra","exitLon":"59.285545","exitLat":"17.920396"},{"exitName":"Sätra Torg","exitLon":"59.284952","exitLat":"17.922394"}]},{"stationName":"Tallkrogen","stationUri":"tallkrogen","stationLines":["MetroGreen"],"stationCentLon":"18.08733","stationCentLat":"59.26856","stationID":"9184","stationExits":[{"exitName":"Tallkrogen","exitLon":"59.2712","exitLat":"18.08516"}]},{"stationName":"Tekniska Högskolan","stationUri":"tekniska-hogskolan","stationLines":["MetroRed"],"stationCentLon":"18.07170","stationCentLat":"59.34554","stationID":"9204","stationExits":[{"exitName":"Danderydsgatan","exitLon":"59.345078","exitLat":"18.07131"},{"exitName":"Tekniska högskolan","exitLon":"59.345962","exitLat":"18.071598"},{"exitName":"Bussar","exitLon":"59.34561","exitLat":"18.071697"},{"exitName":"Körsbärsvägen","exitLon":"59.347292","exitLat":"18.066886"},{"exitName":"Odengatan","exitLon":"59.34663","exitLat":"18.065717"}]},{"stationName":"Tensta","stationUri":"tensta","stationLines":["MetroBlue"],"stationCentLon":"17.90472","stationCentLat":"59.39395","stationID":"9321","stationExits":[{"exitName":"Tenstaplan","exitLon":"59.394832","exitLat":"17.899057"},{"exitName":"Tensta centrum","exitLon":"59.393958","exitLat":"17.904228"}]},{"stationName":"Universitetet","stationUri":"universitetet","stationLines":["MetroRed"],"stationCentLon":"18.05380","stationCentLat":"59.36536","stationID":"9203","stationExits":[{"exitName":"Universitetet","exitLon":"59.36522","exitLat":"18.05492"}]},{"stationName":"Vårby Gård","stationUri":"varby-gard","stationLines":["MetroRed"],"stationCentLon":"17.88652","stationCentLat":"59.26351","stationID":"9285","stationExits":[{"exitName":"Vårby gård","exitLon":"59.264521","exitLat":"17.884444"}]},{"stationName":"Vällingby","stationUri":"vallingby","stationLines":["MetroGreen"],"stationCentLon":"17.87153","stationCentLat":"59.36348","stationID":"9103","stationExits":[{"exitName":"Vällingbyplan","exitLon":"59.36308","exitLat":"17.87257"},{"exitName":"Vällingbyplan 13","exitLon":"59.363142","exitLat":"17.871657"},{"exitName":"Kirunaplan","exitLon":"59.363410","exitLat":"17.871785"},{"exitName":"Vällingbyplan 15","exitLon":"59.363534","exitLat":"17.872303"},{"exitName":"Lyckselevägen","exitLon":"59.3644","exitLat":"17.86962"}]},{"stationName":"Västra Skogen","stationUri":"vastra-skogen","stationLines":["MetroBlue"],"stationCentLon":"18.00302","stationCentLat":"59.34758","stationID":"9306","stationExits":[{"exitName":"Västra skogen","exitLon":"59.34765","exitLat":"18.00349"}]},{"stationName":"Zinkensdamm","stationUri":"zinkensdamm","stationLines":["MetroRed"],"stationCentLon":"18.05027","stationCentLat":"59.31757","stationID":"9296","stationExits":[{"exitName":"Zinkensdamm","exitLon":"59.317716","exitLat":"18.05006"}]},{"stationName":"Östermalmstorg","stationUri":"ostermalmstorg","stationLines":["MetroRed"],"stationCentLon":"18.08004","stationCentLat":"59.33636","stationID":"9206","stationExits":[{"exitName":"Sibylleg.","exitLon":"59.33621","exitLat":"18.079934"},{"exitName":"Östermalmstorg/Nybrog.","exitLon":"59.336418","exitLat":"18.07884"},{"exitName":"Hiss till Östermalmstorg","exitLon":"59.336079","exitLat":"18.079537"},{"exitName":"Grev Tureg.","exitLon":"59.33505","exitLat":"18.074688"},{"exitName":"Birger Jarlsg. vid TGI Friday's","exitLon":"59.335055","exitLat":"18.073862"},{"exitName":"Birger Jarlsg./Jakobsbergsg.","exitLon":"59.334809","exitLat":"18.073701"},{"exitName":"Birger Jarlsg./Mäster Samuelsg.","exitLon":"59.334618","exitLat":"18.073937"}]}];

function coordDistance(coordA, coordB) {
  var PI = 3.14159265359;
  var R = 6371;
  var dLat = (coordB.lat-coordA.lat) * PI / 180;
  var dLon = (coordB.lon-coordA.lon) * PI / 180;
  var lat1 = coordA.lat * PI / 180;
  var lat2 = coordB.lat * PI / 180;

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}

function searchExit(stationName, addressLat, addressLon) {
  stationName = stationName.toLowerCase();
  stationName = stationName.replace("å", "a");
  stationName = stationName.replace("ä", "a");
  stationName = stationName.replace("ö", "o");
  stationName = stationName.replace(" ", "-");
  var station = _.find(stations, function(item) { return item.stationUri == stationName });
  if(!station) {
    console.log("did not find any station");
    return;
  }
  var closestExit = null;
  var closestExitDistance = null;
  for(var i = 0; i < station.stationExits.length; i++) {
    var exit = station.stationExits[i];
    var distance = coordDistance({
      lat: exit.exitLat,
      lon: exit.exitLon
    },
    {
      lat: addressLat,
      lon: addressLon
    });

    if(closestExitDistance == null || distance < closestExitDistance) {
      closestExit = exit;
      closestExitDistance = distance;
    }
  }
  return closestExit;
}

function getExitInfo(trip) {
  var leg = trip.LegList.Leg;
  for(var i = 0; i < leg.length - 1; i++) {
  	var subwayLeg = leg[i];
    var nextLeg = leg[i+1];
    if(subwayLeg.type == "METRO" && nextLeg.type != subwayLeg.type) {
    	subwayLeg.exitInfo = searchExit(nextLeg.Origin.name, nextLeg.Destination.lat, nextLeg.Destination.lon);
    }
  }
  trip.LegList.Leg = leg;
  return trip;
}

function getCorrectFormat(trips) {
	trips = trips.TripList.Trip;
	for(var i=0;i<trips.length;i++) {
		var trip = [];
		if(!Array.isArray(trips[i].LegList.Leg)) {
			trip.push(trips[i].LegList.Leg)
		}
		else {
			trip = trips[i].LegList.Leg;
		}
		trips[i].LegList.Leg = trip;
	}
	return trips;
}

module.exports = {

	getTrips: function(dateTime = null, getEarlierTrips = false) {
		var actionType = "GET_TRIPS";
		var searchForArrival = 0;
		var numTrips = 6;
		var trip = DesiredTripStore.get(); 
		if(!dateTime) {
			numTrips = 5;
			dateTime = trip.date;
			if(trip.timeType == 'departure') {
				searchForArrival = 0;
			}
			else {
				searchForArrival = 1;
			}
		}
		else if(getEarlierTrips) {
			actionType = "GET_EARLIER_TRIPS";
			searchForArrival = 1;
		}
		else {
			actionType = "GET_LATER_TRIPS";
		}



		if(trip.from == null || trip.to == null) {
			return;
		}


		var query = "http://api.sl.se/api2/TravelplannerV2/trip.json?key=" + apiKey;
		var origin = "";
		if(trip.from.id != 0) {
			origin = "&originId=" + trip.from.id;
		}
		else {
			origin = "&originCoordName=" + encodeURIComponent(trip.from.name) + "&originCoordLong=" + trip.from.lon + "&originCoordLat=" + trip.from.lat;

		}
		var destination = ""
		if(trip.to.id != 0) {
			destination = "&destId=" + trip.to.id;
		}
		else {
			destination = "&destCoordName=" + encodeURIComponent(trip.to.name) + "&destCoordLong=" + trip.to.lon + "&destCoordLat=" + trip.to.lat;;
		}
		query = query + origin + destination + "&searchForArrival=" + searchForArrival + "&numTrips=" + numTrips;

		if(dateTime != null) {
			query = query + "&date=" + DesiredTripStore.getFormattedDate(dateTime) + "&time=" + DesiredTripStore.getFormattedTime(dateTime);
		}
		console.log(query);
		fetch(query, {method: "GET"})
	    .then((response) => response.json())
	    .then((responseData) => {
	    		var trips = getCorrectFormat(responseData);
	    		for(var i = 0; i < trips.length; i++) {
	    			trips[i] = getExitInfo(trips[i]);
	    		}
	        AppDispatcher.dispatch({actionType: actionType, state: "ready", data: trips});
	    })
	    .done();
	},

	setTrip: function() {
		AppDispatcher.dispatch({actionType: "SET_TRIP", state: "ready", trip: trip});
	}

}
