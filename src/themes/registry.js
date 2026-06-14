// Master theme registry: maps each African empire id to its palette, piece set
// and cultural metadata. The piece sets are filled in incrementally — every
// empire falls back to the polished default set until its custom art lands
// (see themes/pieces/<empire>). Swapping a set is a one-line import change here.

import { palettes } from './palettes.js'
import defaultSet from './pieces/default/index.jsx'

import maliSet from './pieces/mali/index.jsx'
import songhaiSet from './pieces/songhai/index.jsx'
import kushSet from './pieces/kush/index.jsx'
import aksumSet from './pieces/aksum/index.jsx'
import greatZimbabweSet from './pieces/greatZimbabwe/index.jsx'
import beninSet from './pieces/benin/index.jsx'
import ashantiSet from './pieces/ashanti/index.jsx'
import zuluSet from './pieces/zulu/index.jsx'
import egyptSet from './pieces/egypt/index.jsx'

export const EMPIRE_THEMES = {
  mali: {
    id: 'mali',
    name: 'Mali Empire',
    era: 'c. 1235–1670',
    region: 'West Africa',
    blurb:
      'The empire of Mansa Musa — fabled for its gold, the libraries of Timbuktu and the great mud mosque of Djenné.',
    motif: 'Djenné-mosque crowns and gold of the richest king in history.',
    palette: palettes.mali,
    pieces: maliSet,
  },
  songhai: {
    id: 'songhai',
    name: 'Songhai Empire',
    era: 'c. 1464–1591',
    region: 'West Africa',
    blurb:
      'One of the largest empires in African history, ruling the Niger bend from Gao with the scholarship of Sankoré.',
    motif: 'Niger-river indigo and the cavalry of Askia the Great.',
    palette: palettes.songhai,
    pieces: songhaiSet,
  },
  kush: {
    id: 'kush',
    name: 'Kingdom of Kush',
    era: 'c. 1070 BCE–350 CE',
    region: 'Nubia (Sudan)',
    blurb:
      'The Nubian kingdom of Meroë, land of the Black Pharaohs and more pyramids than all of Egypt.',
    motif: 'Meroitic pyramids, red ochre and royal gold.',
    palette: palettes.kush,
    pieces: kushSet,
  },
  aksum: {
    id: 'aksum',
    name: 'Aksumite Empire',
    era: 'c. 100–940 CE',
    region: 'Ethiopia / Eritrea',
    blurb:
      'A great trading power of the ancient world, raiser of towering granite stelae and minter of its own coins.',
    motif: 'Towering stelae and emerald highlands.',
    palette: palettes.aksum,
    pieces: aksumSet,
  },
  greatZimbabwe: {
    id: 'greatZimbabwe',
    name: 'Great Zimbabwe',
    era: 'c. 1100–1450',
    region: 'Southern Africa',
    blurb:
      'A city of mortarless granite, its conical tower and soapstone birds the heart of a vast gold-trading kingdom.',
    motif: 'Granite Great Enclosure and the soapstone Zimbabwe Bird.',
    palette: palettes.greatZimbabwe,
    pieces: greatZimbabweSet,
  },
  benin: {
    id: 'benin',
    name: 'Benin Kingdom',
    era: 'c. 1180–1897',
    region: 'West Africa (Nigeria)',
    blurb:
      'Famed for its guild-cast bronze plaques and the regalia of the Oba behind the great walls of Benin City.',
    motif: 'Cast-bronze plaques and coral regalia of the Oba.',
    palette: palettes.benin,
    pieces: beninSet,
  },
  ashanti: {
    id: 'ashanti',
    name: 'Ashanti Empire',
    era: 'c. 1701–1957',
    region: 'West Africa (Ghana)',
    blurb:
      'The Asante confederacy, united under the Golden Stool and arrayed in the brilliant colors of kente cloth.',
    motif: 'The Golden Stool and woven kente gold-green-black.',
    palette: palettes.ashanti,
    pieces: ashantiSet,
  },
  zulu: {
    id: 'zulu',
    name: 'Zulu Kingdom',
    era: 'c. 1816–1897',
    region: 'Southern Africa',
    blurb:
      "Shaka's kingdom of the iklwa and the bull-horn formation, masters of the southern African savanna.",
    motif: 'Cowhide war shields, iklwa spears and isicholo crowns.',
    palette: palettes.zulu,
    pieces: zuluSet,
  },
  egypt: {
    id: 'egypt',
    name: 'Ancient Egypt',
    era: 'c. 3100–30 BCE',
    region: 'Northeast Africa',
    blurb:
      'The kingdom of the Nile — pharaohs and pyramids, lapis and gold, the longest-lived civilization of antiquity.',
    motif: 'Pharaonic nemes, lapis blue and the gold of the Nile.',
    palette: palettes.egypt,
    pieces: egyptSet,
  },
}

export const EMPIRE_IDS = Object.keys(EMPIRE_THEMES)

export const DEFAULT_THEME_ID = 'mali'

export function getTheme(themeId) {
  return EMPIRE_THEMES[themeId] || EMPIRE_THEMES[DEFAULT_THEME_ID]
}

// Re-exported so a brand-new empire can wire to the fallback in one line.
export { defaultSet }
