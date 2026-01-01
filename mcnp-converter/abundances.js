/**
 * Natural Isotopic Abundances Database
 * Data from IUPAC 2016 recommendations
 * 
 * Format: ZAID -> { symbol, name, isotopes: [{ mass, abundance, zaid }] }
 * Abundances are in atomic fraction (0-1)
 */

const NATURAL_ABUNDANCES = {
    1: {
        symbol: 'H',
        name: 'Hydrogen',
        isotopes: [
            { mass: 1, abundance: 0.999885, zaid: 1001 },
            { mass: 2, abundance: 0.000115, zaid: 1002 }
        ]
    },
    2: {
        symbol: 'He',
        name: 'Helium',
        isotopes: [
            { mass: 3, abundance: 0.00000134, zaid: 2003 },
            { mass: 4, abundance: 0.99999866, zaid: 2004 }
        ]
    },
    3: {
        symbol: 'Li',
        name: 'Lithium',
        isotopes: [
            { mass: 6, abundance: 0.0759, zaid: 3006 },
            { mass: 7, abundance: 0.9241, zaid: 3007 }
        ]
    },
    4: {
        symbol: 'Be',
        name: 'Beryllium',
        isotopes: [
            { mass: 9, abundance: 1.0, zaid: 4009 }
        ]
    },
    5: {
        symbol: 'B',
        name: 'Boron',
        isotopes: [
            { mass: 10, abundance: 0.199, zaid: 5010 },
            { mass: 11, abundance: 0.801, zaid: 5011 }
        ]
    },
    6: {
        symbol: 'C',
        name: 'Carbon',
        isotopes: [
            { mass: 12, abundance: 0.9893, zaid: 6012 },
            { mass: 13, abundance: 0.0107, zaid: 6013 }
        ]
    },
    7: {
        symbol: 'N',
        name: 'Nitrogen',
        isotopes: [
            { mass: 14, abundance: 0.99636, zaid: 7014 },
            { mass: 15, abundance: 0.00364, zaid: 7015 }
        ]
    },
    8: {
        symbol: 'O',
        name: 'Oxygen',
        isotopes: [
            { mass: 16, abundance: 0.99757, zaid: 8016 },
            { mass: 17, abundance: 0.00038, zaid: 8017 },
            { mass: 18, abundance: 0.00205, zaid: 8018 }
        ]
    },
    9: {
        symbol: 'F',
        name: 'Fluorine',
        isotopes: [
            { mass: 19, abundance: 1.0, zaid: 9019 }
        ]
    },
    10: {
        symbol: 'Ne',
        name: 'Neon',
        isotopes: [
            { mass: 20, abundance: 0.9048, zaid: 10020 },
            { mass: 21, abundance: 0.0027, zaid: 10021 },
            { mass: 22, abundance: 0.0925, zaid: 10022 }
        ]
    },
    11: {
        symbol: 'Na',
        name: 'Sodium',
        isotopes: [
            { mass: 23, abundance: 1.0, zaid: 11023 }
        ]
    },
    12: {
        symbol: 'Mg',
        name: 'Magnesium',
        isotopes: [
            { mass: 24, abundance: 0.7899, zaid: 12024 },
            { mass: 25, abundance: 0.1000, zaid: 12025 },
            { mass: 26, abundance: 0.1101, zaid: 12026 }
        ]
    },
    13: {
        symbol: 'Al',
        name: 'Aluminum',
        isotopes: [
            { mass: 27, abundance: 1.0, zaid: 13027 }
        ]
    },
    14: {
        symbol: 'Si',
        name: 'Silicon',
        isotopes: [
            { mass: 28, abundance: 0.92223, zaid: 14028 },
            { mass: 29, abundance: 0.04685, zaid: 14029 },
            { mass: 30, abundance: 0.03092, zaid: 14030 }
        ]
    },
    15: {
        symbol: 'P',
        name: 'Phosphorus',
        isotopes: [
            { mass: 31, abundance: 1.0, zaid: 15031 }
        ]
    },
    16: {
        symbol: 'S',
        name: 'Sulfur',
        isotopes: [
            { mass: 32, abundance: 0.9499, zaid: 16032 },
            { mass: 33, abundance: 0.0075, zaid: 16033 },
            { mass: 34, abundance: 0.0425, zaid: 16034 },
            { mass: 36, abundance: 0.0001, zaid: 16036 }
        ]
    },
    17: {
        symbol: 'Cl',
        name: 'Chlorine',
        isotopes: [
            { mass: 35, abundance: 0.7576, zaid: 17035 },
            { mass: 37, abundance: 0.2424, zaid: 17037 }
        ]
    },
    18: {
        symbol: 'Ar',
        name: 'Argon',
        isotopes: [
            { mass: 36, abundance: 0.003336, zaid: 18036 },
            { mass: 38, abundance: 0.000629, zaid: 18038 },
            { mass: 40, abundance: 0.996035, zaid: 18040 }
        ]
    },
    19: {
        symbol: 'K',
        name: 'Potassium',
        isotopes: [
            { mass: 39, abundance: 0.932581, zaid: 19039 },
            { mass: 40, abundance: 0.000117, zaid: 19040 },
            { mass: 41, abundance: 0.067302, zaid: 19041 }
        ]
    },
    20: {
        symbol: 'Ca',
        name: 'Calcium',
        isotopes: [
            { mass: 40, abundance: 0.96941, zaid: 20040 },
            { mass: 42, abundance: 0.00647, zaid: 20042 },
            { mass: 43, abundance: 0.00135, zaid: 20043 },
            { mass: 44, abundance: 0.02086, zaid: 20044 },
            { mass: 46, abundance: 0.00004, zaid: 20046 },
            { mass: 48, abundance: 0.00187, zaid: 20048 }
        ]
    },
    21: {
        symbol: 'Sc',
        name: 'Scandium',
        isotopes: [
            { mass: 45, abundance: 1.0, zaid: 21045 }
        ]
    },
    22: {
        symbol: 'Ti',
        name: 'Titanium',
        isotopes: [
            { mass: 46, abundance: 0.0825, zaid: 22046 },
            { mass: 47, abundance: 0.0744, zaid: 22047 },
            { mass: 48, abundance: 0.7372, zaid: 22048 },
            { mass: 49, abundance: 0.0541, zaid: 22049 },
            { mass: 50, abundance: 0.0518, zaid: 22050 }
        ]
    },
    23: {
        symbol: 'V',
        name: 'Vanadium',
        isotopes: [
            { mass: 50, abundance: 0.00250, zaid: 23050 },
            { mass: 51, abundance: 0.99750, zaid: 23051 }
        ]
    },
    24: {
        symbol: 'Cr',
        name: 'Chromium',
        isotopes: [
            { mass: 50, abundance: 0.04345, zaid: 24050 },
            { mass: 52, abundance: 0.83789, zaid: 24052 },
            { mass: 53, abundance: 0.09501, zaid: 24053 },
            { mass: 54, abundance: 0.02365, zaid: 24054 }
        ]
    },
    25: {
        symbol: 'Mn',
        name: 'Manganese',
        isotopes: [
            { mass: 55, abundance: 1.0, zaid: 25055 }
        ]
    },
    26: {
        symbol: 'Fe',
        name: 'Iron',
        isotopes: [
            { mass: 54, abundance: 0.05845, zaid: 26054 },
            { mass: 56, abundance: 0.91754, zaid: 26056 },
            { mass: 57, abundance: 0.02119, zaid: 26057 },
            { mass: 58, abundance: 0.00282, zaid: 26058 }
        ]
    },
    27: {
        symbol: 'Co',
        name: 'Cobalt',
        isotopes: [
            { mass: 59, abundance: 1.0, zaid: 27059 }
        ]
    },
    28: {
        symbol: 'Ni',
        name: 'Nickel',
        isotopes: [
            { mass: 58, abundance: 0.680769, zaid: 28058 },
            { mass: 60, abundance: 0.262231, zaid: 28060 },
            { mass: 61, abundance: 0.011399, zaid: 28061 },
            { mass: 62, abundance: 0.036345, zaid: 28062 },
            { mass: 64, abundance: 0.009256, zaid: 28064 }
        ]
    },
    29: {
        symbol: 'Cu',
        name: 'Copper',
        isotopes: [
            { mass: 63, abundance: 0.6915, zaid: 29063 },
            { mass: 65, abundance: 0.3085, zaid: 29065 }
        ]
    },
    30: {
        symbol: 'Zn',
        name: 'Zinc',
        isotopes: [
            { mass: 64, abundance: 0.4917, zaid: 30064 },
            { mass: 66, abundance: 0.2773, zaid: 30066 },
            { mass: 67, abundance: 0.0404, zaid: 30067 },
            { mass: 68, abundance: 0.1845, zaid: 30068 },
            { mass: 70, abundance: 0.0061, zaid: 30070 }
        ]
    },
    31: {
        symbol: 'Ga',
        name: 'Gallium',
        isotopes: [
            { mass: 69, abundance: 0.60108, zaid: 31069 },
            { mass: 71, abundance: 0.39892, zaid: 31071 }
        ]
    },
    32: {
        symbol: 'Ge',
        name: 'Germanium',
        isotopes: [
            { mass: 70, abundance: 0.2057, zaid: 32070 },
            { mass: 72, abundance: 0.2745, zaid: 32072 },
            { mass: 73, abundance: 0.0775, zaid: 32073 },
            { mass: 74, abundance: 0.3650, zaid: 32074 },
            { mass: 76, abundance: 0.0773, zaid: 32076 }
        ]
    },
    33: {
        symbol: 'As',
        name: 'Arsenic',
        isotopes: [
            { mass: 75, abundance: 1.0, zaid: 33075 }
        ]
    },
    34: {
        symbol: 'Se',
        name: 'Selenium',
        isotopes: [
            { mass: 74, abundance: 0.0089, zaid: 34074 },
            { mass: 76, abundance: 0.0937, zaid: 34076 },
            { mass: 77, abundance: 0.0763, zaid: 34077 },
            { mass: 78, abundance: 0.2377, zaid: 34078 },
            { mass: 80, abundance: 0.4961, zaid: 34080 },
            { mass: 82, abundance: 0.0873, zaid: 34082 }
        ]
    },
    35: {
        symbol: 'Br',
        name: 'Bromine',
        isotopes: [
            { mass: 79, abundance: 0.5069, zaid: 35079 },
            { mass: 81, abundance: 0.4931, zaid: 35081 }
        ]
    },
    36: {
        symbol: 'Kr',
        name: 'Krypton',
        isotopes: [
            { mass: 78, abundance: 0.00355, zaid: 36078 },
            { mass: 80, abundance: 0.02286, zaid: 36080 },
            { mass: 82, abundance: 0.11593, zaid: 36082 },
            { mass: 83, abundance: 0.11500, zaid: 36083 },
            { mass: 84, abundance: 0.56987, zaid: 36084 },
            { mass: 86, abundance: 0.17279, zaid: 36086 }
        ]
    },
    37: {
        symbol: 'Rb',
        name: 'Rubidium',
        isotopes: [
            { mass: 85, abundance: 0.7217, zaid: 37085 },
            { mass: 87, abundance: 0.2783, zaid: 37087 }
        ]
    },
    38: {
        symbol: 'Sr',
        name: 'Strontium',
        isotopes: [
            { mass: 84, abundance: 0.0056, zaid: 38084 },
            { mass: 86, abundance: 0.0986, zaid: 38086 },
            { mass: 87, abundance: 0.0700, zaid: 38087 },
            { mass: 88, abundance: 0.8258, zaid: 38088 }
        ]
    },
    39: {
        symbol: 'Y',
        name: 'Yttrium',
        isotopes: [
            { mass: 89, abundance: 1.0, zaid: 39089 }
        ]
    },
    40: {
        symbol: 'Zr',
        name: 'Zirconium',
        isotopes: [
            { mass: 90, abundance: 0.5145, zaid: 40090 },
            { mass: 91, abundance: 0.1122, zaid: 40091 },
            { mass: 92, abundance: 0.1715, zaid: 40092 },
            { mass: 94, abundance: 0.1738, zaid: 40094 },
            { mass: 96, abundance: 0.0280, zaid: 40096 }
        ]
    },
    41: {
        symbol: 'Nb',
        name: 'Niobium',
        isotopes: [
            { mass: 93, abundance: 1.0, zaid: 41093 }
        ]
    },
    42: {
        symbol: 'Mo',
        name: 'Molybdenum',
        isotopes: [
            { mass: 92, abundance: 0.1477, zaid: 42092 },
            { mass: 94, abundance: 0.0923, zaid: 42094 },
            { mass: 95, abundance: 0.1590, zaid: 42095 },
            { mass: 96, abundance: 0.1668, zaid: 42096 },
            { mass: 97, abundance: 0.0956, zaid: 42097 },
            { mass: 98, abundance: 0.2419, zaid: 42098 },
            { mass: 100, abundance: 0.0967, zaid: 42100 }
        ]
    },
    44: {
        symbol: 'Ru',
        name: 'Ruthenium',
        isotopes: [
            { mass: 96, abundance: 0.0554, zaid: 44096 },
            { mass: 98, abundance: 0.0187, zaid: 44098 },
            { mass: 99, abundance: 0.1276, zaid: 44099 },
            { mass: 100, abundance: 0.1260, zaid: 44100 },
            { mass: 101, abundance: 0.1706, zaid: 44101 },
            { mass: 102, abundance: 0.3155, zaid: 44102 },
            { mass: 104, abundance: 0.1862, zaid: 44104 }
        ]
    },
    45: {
        symbol: 'Rh',
        name: 'Rhodium',
        isotopes: [
            { mass: 103, abundance: 1.0, zaid: 45103 }
        ]
    },
    46: {
        symbol: 'Pd',
        name: 'Palladium',
        isotopes: [
            { mass: 102, abundance: 0.0102, zaid: 46102 },
            { mass: 104, abundance: 0.1114, zaid: 46104 },
            { mass: 105, abundance: 0.2233, zaid: 46105 },
            { mass: 106, abundance: 0.2733, zaid: 46106 },
            { mass: 108, abundance: 0.2646, zaid: 46108 },
            { mass: 110, abundance: 0.1172, zaid: 46110 }
        ]
    },
    47: {
        symbol: 'Ag',
        name: 'Silver',
        isotopes: [
            { mass: 107, abundance: 0.51839, zaid: 47107 },
            { mass: 109, abundance: 0.48161, zaid: 47109 }
        ]
    },
    48: {
        symbol: 'Cd',
        name: 'Cadmium',
        isotopes: [
            { mass: 106, abundance: 0.0125, zaid: 48106 },
            { mass: 108, abundance: 0.0089, zaid: 48108 },
            { mass: 110, abundance: 0.1249, zaid: 48110 },
            { mass: 111, abundance: 0.1280, zaid: 48111 },
            { mass: 112, abundance: 0.2413, zaid: 48112 },
            { mass: 113, abundance: 0.1222, zaid: 48113 },
            { mass: 114, abundance: 0.2873, zaid: 48114 },
            { mass: 116, abundance: 0.0749, zaid: 48116 }
        ]
    },
    49: {
        symbol: 'In',
        name: 'Indium',
        isotopes: [
            { mass: 113, abundance: 0.0429, zaid: 49113 },
            { mass: 115, abundance: 0.9571, zaid: 49115 }
        ]
    },
    50: {
        symbol: 'Sn',
        name: 'Tin',
        isotopes: [
            { mass: 112, abundance: 0.0097, zaid: 50112 },
            { mass: 114, abundance: 0.0066, zaid: 50114 },
            { mass: 115, abundance: 0.0034, zaid: 50115 },
            { mass: 116, abundance: 0.1454, zaid: 50116 },
            { mass: 117, abundance: 0.0768, zaid: 50117 },
            { mass: 118, abundance: 0.2422, zaid: 50118 },
            { mass: 119, abundance: 0.0859, zaid: 50119 },
            { mass: 120, abundance: 0.3258, zaid: 50120 },
            { mass: 122, abundance: 0.0463, zaid: 50122 },
            { mass: 124, abundance: 0.0579, zaid: 50124 }
        ]
    },
    51: {
        symbol: 'Sb',
        name: 'Antimony',
        isotopes: [
            { mass: 121, abundance: 0.5721, zaid: 51121 },
            { mass: 123, abundance: 0.4279, zaid: 51123 }
        ]
    },
    52: {
        symbol: 'Te',
        name: 'Tellurium',
        isotopes: [
            { mass: 120, abundance: 0.0009, zaid: 52120 },
            { mass: 122, abundance: 0.0255, zaid: 52122 },
            { mass: 123, abundance: 0.0089, zaid: 52123 },
            { mass: 124, abundance: 0.0474, zaid: 52124 },
            { mass: 125, abundance: 0.0707, zaid: 52125 },
            { mass: 126, abundance: 0.1884, zaid: 52126 },
            { mass: 128, abundance: 0.3174, zaid: 52128 },
            { mass: 130, abundance: 0.3408, zaid: 52130 }
        ]
    },
    53: {
        symbol: 'I',
        name: 'Iodine',
        isotopes: [
            { mass: 127, abundance: 1.0, zaid: 53127 }
        ]
    },
    54: {
        symbol: 'Xe',
        name: 'Xenon',
        isotopes: [
            { mass: 124, abundance: 0.000952, zaid: 54124 },
            { mass: 126, abundance: 0.000890, zaid: 54126 },
            { mass: 128, abundance: 0.019102, zaid: 54128 },
            { mass: 129, abundance: 0.264006, zaid: 54129 },
            { mass: 130, abundance: 0.040710, zaid: 54130 },
            { mass: 131, abundance: 0.212324, zaid: 54131 },
            { mass: 132, abundance: 0.269086, zaid: 54132 },
            { mass: 134, abundance: 0.104357, zaid: 54134 },
            { mass: 136, abundance: 0.088573, zaid: 54136 }
        ]
    },
    55: {
        symbol: 'Cs',
        name: 'Cesium',
        isotopes: [
            { mass: 133, abundance: 1.0, zaid: 55133 }
        ]
    },
    56: {
        symbol: 'Ba',
        name: 'Barium',
        isotopes: [
            { mass: 130, abundance: 0.00106, zaid: 56130 },
            { mass: 132, abundance: 0.00101, zaid: 56132 },
            { mass: 134, abundance: 0.02417, zaid: 56134 },
            { mass: 135, abundance: 0.06592, zaid: 56135 },
            { mass: 136, abundance: 0.07854, zaid: 56136 },
            { mass: 137, abundance: 0.11232, zaid: 56137 },
            { mass: 138, abundance: 0.71698, zaid: 56138 }
        ]
    },
    57: {
        symbol: 'La',
        name: 'Lanthanum',
        isotopes: [
            { mass: 138, abundance: 0.0008881, zaid: 57138 },
            { mass: 139, abundance: 0.9991119, zaid: 57139 }
        ]
    },
    58: {
        symbol: 'Ce',
        name: 'Cerium',
        isotopes: [
            { mass: 136, abundance: 0.00185, zaid: 58136 },
            { mass: 138, abundance: 0.00251, zaid: 58138 },
            { mass: 140, abundance: 0.88450, zaid: 58140 },
            { mass: 142, abundance: 0.11114, zaid: 58142 }
        ]
    },
    59: {
        symbol: 'Pr',
        name: 'Praseodymium',
        isotopes: [
            { mass: 141, abundance: 1.0, zaid: 59141 }
        ]
    },
    60: {
        symbol: 'Nd',
        name: 'Neodymium',
        isotopes: [
            { mass: 142, abundance: 0.27152, zaid: 60142 },
            { mass: 143, abundance: 0.12174, zaid: 60143 },
            { mass: 144, abundance: 0.23798, zaid: 60144 },
            { mass: 145, abundance: 0.08293, zaid: 60145 },
            { mass: 146, abundance: 0.17189, zaid: 60146 },
            { mass: 148, abundance: 0.05756, zaid: 60148 },
            { mass: 150, abundance: 0.05638, zaid: 60150 }
        ]
    },
    62: {
        symbol: 'Sm',
        name: 'Samarium',
        isotopes: [
            { mass: 144, abundance: 0.0307, zaid: 62144 },
            { mass: 147, abundance: 0.1499, zaid: 62147 },
            { mass: 148, abundance: 0.1124, zaid: 62148 },
            { mass: 149, abundance: 0.1382, zaid: 62149 },
            { mass: 150, abundance: 0.0738, zaid: 62150 },
            { mass: 152, abundance: 0.2675, zaid: 62152 },
            { mass: 154, abundance: 0.2275, zaid: 62154 }
        ]
    },
    63: {
        symbol: 'Eu',
        name: 'Europium',
        isotopes: [
            { mass: 151, abundance: 0.4781, zaid: 63151 },
            { mass: 153, abundance: 0.5219, zaid: 63153 }
        ]
    },
    64: {
        symbol: 'Gd',
        name: 'Gadolinium',
        isotopes: [
            { mass: 152, abundance: 0.0020, zaid: 64152 },
            { mass: 154, abundance: 0.0218, zaid: 64154 },
            { mass: 155, abundance: 0.1480, zaid: 64155 },
            { mass: 156, abundance: 0.2047, zaid: 64156 },
            { mass: 157, abundance: 0.1565, zaid: 64157 },
            { mass: 158, abundance: 0.2484, zaid: 64158 },
            { mass: 160, abundance: 0.2186, zaid: 64160 }
        ]
    },
    65: {
        symbol: 'Tb',
        name: 'Terbium',
        isotopes: [
            { mass: 159, abundance: 1.0, zaid: 65159 }
        ]
    },
    66: {
        symbol: 'Dy',
        name: 'Dysprosium',
        isotopes: [
            { mass: 156, abundance: 0.00056, zaid: 66156 },
            { mass: 158, abundance: 0.00095, zaid: 66158 },
            { mass: 160, abundance: 0.02329, zaid: 66160 },
            { mass: 161, abundance: 0.18889, zaid: 66161 },
            { mass: 162, abundance: 0.25475, zaid: 66162 },
            { mass: 163, abundance: 0.24896, zaid: 66163 },
            { mass: 164, abundance: 0.28260, zaid: 66164 }
        ]
    },
    67: {
        symbol: 'Ho',
        name: 'Holmium',
        isotopes: [
            { mass: 165, abundance: 1.0, zaid: 67165 }
        ]
    },
    68: {
        symbol: 'Er',
        name: 'Erbium',
        isotopes: [
            { mass: 162, abundance: 0.00139, zaid: 68162 },
            { mass: 164, abundance: 0.01601, zaid: 68164 },
            { mass: 166, abundance: 0.33503, zaid: 68166 },
            { mass: 167, abundance: 0.22869, zaid: 68167 },
            { mass: 168, abundance: 0.26978, zaid: 68168 },
            { mass: 170, abundance: 0.14910, zaid: 68170 }
        ]
    },
    69: {
        symbol: 'Tm',
        name: 'Thulium',
        isotopes: [
            { mass: 169, abundance: 1.0, zaid: 69169 }
        ]
    },
    70: {
        symbol: 'Yb',
        name: 'Ytterbium',
        isotopes: [
            { mass: 168, abundance: 0.00123, zaid: 70168 },
            { mass: 170, abundance: 0.02982, zaid: 70170 },
            { mass: 171, abundance: 0.14090, zaid: 70171 },
            { mass: 172, abundance: 0.21690, zaid: 70172 },
            { mass: 173, abundance: 0.16103, zaid: 70173 },
            { mass: 174, abundance: 0.32026, zaid: 70174 },
            { mass: 176, abundance: 0.12996, zaid: 70176 }
        ]
    },
    71: {
        symbol: 'Lu',
        name: 'Lutetium',
        isotopes: [
            { mass: 175, abundance: 0.97401, zaid: 71175 },
            { mass: 176, abundance: 0.02599, zaid: 71176 }
        ]
    },
    72: {
        symbol: 'Hf',
        name: 'Hafnium',
        isotopes: [
            { mass: 174, abundance: 0.0016, zaid: 72174 },
            { mass: 176, abundance: 0.0526, zaid: 72176 },
            { mass: 177, abundance: 0.1860, zaid: 72177 },
            { mass: 178, abundance: 0.2728, zaid: 72178 },
            { mass: 179, abundance: 0.1362, zaid: 72179 },
            { mass: 180, abundance: 0.3508, zaid: 72180 }
        ]
    },
    73: {
        symbol: 'Ta',
        name: 'Tantalum',
        isotopes: [
            { mass: 180, abundance: 0.0001201, zaid: 73180 },
            { mass: 181, abundance: 0.9998799, zaid: 73181 }
        ]
    },
    74: {
        symbol: 'W',
        name: 'Tungsten',
        isotopes: [
            { mass: 180, abundance: 0.0012, zaid: 74180 },
            { mass: 182, abundance: 0.2650, zaid: 74182 },
            { mass: 183, abundance: 0.1431, zaid: 74183 },
            { mass: 184, abundance: 0.3064, zaid: 74184 },
            { mass: 186, abundance: 0.2843, zaid: 74186 }
        ]
    },
    75: {
        symbol: 'Re',
        name: 'Rhenium',
        isotopes: [
            { mass: 185, abundance: 0.3740, zaid: 75185 },
            { mass: 187, abundance: 0.6260, zaid: 75187 }
        ]
    },
    76: {
        symbol: 'Os',
        name: 'Osmium',
        isotopes: [
            { mass: 184, abundance: 0.0002, zaid: 76184 },
            { mass: 186, abundance: 0.0159, zaid: 76186 },
            { mass: 187, abundance: 0.0196, zaid: 76187 },
            { mass: 188, abundance: 0.1324, zaid: 76188 },
            { mass: 189, abundance: 0.1615, zaid: 76189 },
            { mass: 190, abundance: 0.2626, zaid: 76190 },
            { mass: 192, abundance: 0.4078, zaid: 76192 }
        ]
    },
    77: {
        symbol: 'Ir',
        name: 'Iridium',
        isotopes: [
            { mass: 191, abundance: 0.373, zaid: 77191 },
            { mass: 193, abundance: 0.627, zaid: 77193 }
        ]
    },
    78: {
        symbol: 'Pt',
        name: 'Platinum',
        isotopes: [
            { mass: 190, abundance: 0.00012, zaid: 78190 },
            { mass: 192, abundance: 0.00782, zaid: 78192 },
            { mass: 194, abundance: 0.32864, zaid: 78194 },
            { mass: 195, abundance: 0.33775, zaid: 78195 },
            { mass: 196, abundance: 0.25211, zaid: 78196 },
            { mass: 198, abundance: 0.07356, zaid: 78198 }
        ]
    },
    79: {
        symbol: 'Au',
        name: 'Gold',
        isotopes: [
            { mass: 197, abundance: 1.0, zaid: 79197 }
        ]
    },
    80: {
        symbol: 'Hg',
        name: 'Mercury',
        isotopes: [
            { mass: 196, abundance: 0.0015, zaid: 80196 },
            { mass: 198, abundance: 0.0997, zaid: 80198 },
            { mass: 199, abundance: 0.1687, zaid: 80199 },
            { mass: 200, abundance: 0.2310, zaid: 80200 },
            { mass: 201, abundance: 0.1318, zaid: 80201 },
            { mass: 202, abundance: 0.2986, zaid: 80202 },
            { mass: 204, abundance: 0.0687, zaid: 80204 }
        ]
    },
    81: {
        symbol: 'Tl',
        name: 'Thallium',
        isotopes: [
            { mass: 203, abundance: 0.2952, zaid: 81203 },
            { mass: 205, abundance: 0.7048, zaid: 81205 }
        ]
    },
    82: {
        symbol: 'Pb',
        name: 'Lead',
        isotopes: [
            { mass: 204, abundance: 0.014, zaid: 82204 },
            { mass: 206, abundance: 0.241, zaid: 82206 },
            { mass: 207, abundance: 0.221, zaid: 82207 },
            { mass: 208, abundance: 0.524, zaid: 82208 }
        ]
    },
    83: {
        symbol: 'Bi',
        name: 'Bismuth',
        isotopes: [
            { mass: 209, abundance: 1.0, zaid: 83209 }
        ]
    },
    90: {
        symbol: 'Th',
        name: 'Thorium',
        isotopes: [
            { mass: 232, abundance: 1.0, zaid: 90232 }
        ]
    },
    91: {
        symbol: 'Pa',
        name: 'Protactinium',
        isotopes: [
            { mass: 231, abundance: 1.0, zaid: 91231 }
        ]
    },
    92: {
        symbol: 'U',
        name: 'Uranium',
        isotopes: [
            { mass: 234, abundance: 0.000054, zaid: 92234 },
            { mass: 235, abundance: 0.007204, zaid: 92235 },
            { mass: 238, abundance: 0.992742, zaid: 92238 }
        ]
    }
};

// Helper function to get element data by Z number
function getElementByZ(z) {
    return NATURAL_ABUNDANCES[z] || null;
}

// Helper function to check if a ZAID is elemental (ends in 000)
function isElementalZAID(zaid) {
    return (zaid % 1000) === 0;
}

// Helper function to get Z from ZAID
function getZFromZAID(zaid) {
    return Math.floor(zaid / 1000);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NATURAL_ABUNDANCES, getElementByZ, isElementalZAID, getZFromZAID };
}
