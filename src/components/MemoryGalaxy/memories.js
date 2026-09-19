import photoUsBeingUs from '../../assets/memories/photo-us-being-us.png'
import photoFavouritePerson from '../../assets/memories/photo-favourite-person.png'
import photoFavouriteSmiles from '../../assets/memories/photo-favourite-smiles.png'
import photoAnotherMemory from '../../assets/memories/photo-another-memory.png'
import favouriteMomentVideo from '../../assets/memories/favourite-moment.mp4'

export const memoryPhotos = [
  {
    id: 'us-being-us',
    src: photoUsBeingUs,
    label: 'us being us',
    desktop: { position: [-2.1, 0.35, 0.6], rotation: [0.08, 0.35, -0.06], scale: 1 },
    mobile: { position: [-1.15, 0.85, 0.4], rotation: [0.05, 0.2, -0.04], scale: 1.15 },
    floatSpeed: 0.55,
    floatAmp: 0.08,
  },
  {
    id: 'favourite-person',
    src: photoFavouritePerson,
    label: 'my favourite person',
    desktop: { position: [2.15, 0.45, 0.4], rotation: [-0.05, -0.32, 0.05], scale: 1 },
    mobile: { position: [1.2, 0.75, 0.35], rotation: [-0.04, -0.18, 0.04], scale: 1.15 },
    floatSpeed: 0.42,
    floatAmp: 0.1,
  },
  {
    id: 'favourite-smiles',
    src: photoFavouriteSmiles,
    label: 'one of my favourite smiles',
    desktop: { position: [-1.35, -1.35, 0.9], rotation: [0.12, 0.22, 0.04], scale: 0.95 },
    mobile: { position: [-0.95, -1.15, 0.55], rotation: [0.08, 0.15, 0.03], scale: 1.1 },
    floatSpeed: 0.48,
    floatAmp: 0.09,
  },
  {
    id: 'another-memory',
    src: photoAnotherMemory,
    label: 'another little memory',
    desktop: { position: [1.4, -1.2, 0.75], rotation: [0.1, -0.25, -0.03], scale: 0.95 },
    mobile: { position: [1.0, -1.05, 0.5], rotation: [0.06, -0.14, -0.02], scale: 1.1 },
    floatSpeed: 0.6,
    floatAmp: 0.07,
  },
]

export const memoryVideo = {
  id: 'favourite-moment',
  src: favouriteMomentVideo,
  poster: photoFavouritePerson,
  label: 'one of my favourite moments',
  desktop: { position: [0, 1.55, 0.3], rotation: [0.05, 0.08, 0], scale: 0.9 },
  mobile: { position: [0, 1.55, 0.25], rotation: [0.04, 0.05, 0], scale: 1.05 },
}
