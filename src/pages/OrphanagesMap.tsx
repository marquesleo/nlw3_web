import React, { useEffect, useState} from 'react';

import '../styles/pages/orphanages-map.css';
import mapMarkerImg from  '../images/map-marker.svg';

import {FiPlus,FiArrowRight} from  'react-icons/fi';
import {Link} from 'react-router-dom';
import { Map,TileLayer,Marker,Popup} from 'react-leaflet';




import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage {
    id: number;
    latitude:number;
    longitude:number;
    name:string;
    instruction:string;
    opening_hours:string;
    description:string;
    open_on_weekends:string;

}


function OrphanagesMap(){ 
    
 const [orphanages,setOrphanages] = useState<Orphanage[]>([]);

 useEffect(() => {
   api.get('orphanages').then(response => {
       console.log(response.data);
      setOrphanages(response.data);
   }) ;
 },[]);

return (
        <div id='page-map'>
            <aside>
                <header>
                    <img src={mapMarkerImg} alt='Happy'/>

                    <h2>Escolha um Orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
                <footer>
                    <strong>Nova Friburgo</strong>
                    <span>Rio de Janeiro</span>
                </footer>
            </aside>
           <Map center={[-22.2310626,-42.5215347]} 
                zoom={15} style={{ width:'100%', height:'100%'}}>
                    

               console.log(process.env.REAC_APP_MAPBOX_TOKEN)  ;   
               {/*<TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'></TileLayer>*/}    
                 <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
                 />
                 {orphanages.map(orphanage => {
                    return (
                        <Marker
                            icon={mapIcon}
                            position={[orphanage.latitude,orphanage.longitude]}
                            key={orphanage.id}    
                         >

                             <Popup closeButton={false}
                              minWidth={240} maxWidth={240} 
                              className="map-popup">
                                    {orphanage.name}
                                    
                                     <Link to={`orphanages/${orphanage.id}`}>
                                           <FiArrowRight  size={20} color="#FFF"/>
                                     </Link>
                             </Popup>
                        </Marker>  
                    )
                 })}
            
                  
             </Map>
            <Link to='orphanages/create' className='create-orphanage'> 
                <FiPlus size={32} color='#FFF' />
            </Link>
        </div>
        
    );
}

export default OrphanagesMap;