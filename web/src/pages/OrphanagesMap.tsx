import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import mapMarkerImg from '../images/Local.svg';
import '../styles/pages/orphanages-map.css';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';


// https://docs.mapbox.com/mapbox-gl-js/api/map/
// TODO criar um input para escolher tema do mapa
// const mapStyles = {
//     ruas: 'streets-v11',
//     outdoors: 'outdoors-v11',
//     light: 'light-v10',
//     dark: 'dark-v10',
//     satellite: 'satellite-v9',
//     satellitestreets: 'satellite-streets-v11',
//     navigationpreviewday: 'navigation-preview-day-v4',
//     navigationPreviewnightv4: 'navigation-preview-night-v4',
//     navigationGuidanceDay: 'avigation-guidance-day-v4',
//     navigationGuidanceNight: 'navigation-guidance-night'
// }

interface Orphanage{
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap() {
const [orphanages, setOrphanages] = useState<Orphanage[]>([])



    useEffect(()=>{
        api.get('orphanages').then(response=>{
            setOrphanages(response.data);
            
        })
    }, []);
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão
esperando a sua visita :)</p>
                </header>
                <footer>
                    <strong>
                        São Paulo
                    </strong>
                    <span>
                        São Paulo
                    </span>
                </footer>
            </aside>

            <Map
                center={[-23.6420983, -46.6029821]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />



               {orphanages.map(orphanage=>{
                   return (
                    <Marker
                    icon={mapIcon}
                    position={[orphanage.latitude, orphanage.longitude]}
                    key={orphanage.id}
                >
                    <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                       {orphanage.name}
                    <Link to={`/orphanages/${orphanage.id}`}>
                            <FiArrowRight size={20} color="#fff" />

                        </Link>
                    </Popup>

                </Marker>
                   )
               })}
            </Map>
            <Link to="/orphanages/create" className="create-orphanage"><FiPlus size={32} color="#fff" />
            </Link>
        </div>
    );
}

export default OrphanagesMap;