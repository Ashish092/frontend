'use client'

import { Search } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface Suburb {
  name: string
  postcode: string
  region: string
}

// Add all Melbourne suburbs
const suburbs: Suburb[] = [
  
    { name: "Carlton", postcode: "3053", region: "Melbourne" },
    { name: "Docklands", postcode: "3008", region: "Melbourne" },
    { name: "Brunswick", postcode: "3056", region: "Melbourne" },
    { name: "Richmond", postcode: "3121", region: "Melbourne" },
    { name: "Fitzroy", postcode: "3065", region: "Melbourne" },
    { name: "Southbank", postcode: "3006", region: "Melbourne" },
    { name: "St Kilda", postcode: "3182", region: "Melbourne" },
    { name: "Footscray", postcode: "3011", region: "Melbourne" },
    { name: "Yarraville", postcode: "3013", region: "Melbourne" },
    { name: "Essendon", postcode: "3040", region: "Melbourne" },
    { name: "Malvern", postcode: "3144", region: "Melbourne" },
    { name: "Prahran", postcode: "3181", region: "Melbourne" },
    { name: "Coburg", postcode: "3058", region: "Melbourne" },
    { name: "Northcote", postcode: "3070", region: "Melbourne" },
    { name: "Hawthorn", postcode: "3122", region: "Melbourne" },
    { name: "Port Melbourne", postcode: "3207", region: "Melbourne" },
    { name: "Parkville", postcode: "3052", region: "Melbourne" },
    { name: "South Melbourne", postcode: "3205", region: "Melbourne" },
    { name: "North Melbourne", postcode: "3051", region: "Melbourne" },
    { name: "South Yarra", postcode: "3141", region: "Melbourne" },
    { name: "Albert Park", postcode: "3206", region: "Melbourne" },
    { name: "Balaclava", postcode: "3183", region: "Melbourne" },
    { name: "Glen Iris", postcode: "3146", region: "Melbourne" },
    { name: "Kew", postcode: "3101", region: "Melbourne" },
    { name: "Collingwood", postcode: "3066", region: "Melbourne" },
    { name: "Camberwell", postcode: "3124", region: "Melbourne" },
    { name: "Brighton", postcode: "3186", region: "Melbourne" },
    { name: "Balwyn", postcode: "3103", region: "Melbourne" },
    { name: "Hampton", postcode: "3188", region: "Melbourne" },
    { name: "Sandringham", postcode: "3191", region: "Melbourne" },
    { name: "Elwood", postcode: "3184", region: "Melbourne" },
    { name: "Moonee Ponds", postcode: "3039", region: "Melbourne" },
    { name: "Armadale", postcode: "3143", region: "Melbourne" },
    { name: "Clifton Hill", postcode: "3068", region: "Melbourne" },
    { name: "Elsternwick", postcode: "3185", region: "Melbourne" },
    { name: "Fairfield", postcode: "3078", region: "Melbourne" },
    { name: "Glenroy", postcode: "3046", region: "Melbourne" },
    { name: "Altona", postcode: "3018", region: "Melbourne" },
    { name: "Pascoe Vale", postcode: "3044", region: "Melbourne" },
    { name: "Reservoir", postcode: "3073", region: "Melbourne" },
    { name: "Box Hill", postcode: "3128", region: "Melbourne" },
    { name: "Doncaster", postcode: "3108", region: "Melbourne" },
    { name: "Burwood", postcode: "3125", region: "Melbourne" },
    { name: "Caulfield", postcode: "3162", region: "Melbourne" },
    { name: "Ivanhoe", postcode: "3079", region: "Melbourne" },
    { name: "Hoppers Crossing", postcode: "3029", region: "Melbourne" },
    { name: "Maribyrnong", postcode: "3032", region: "Melbourne" },
    { name: "Seddon", postcode: "3011", region: "Melbourne" },
    { name: "Ascot Vale", postcode: "3032", region: "Melbourne" },
    { name: "Ashburton", postcode: "3147", region: "Melbourne" },
    { name: "Ashwood", postcode: "3147", region: "Melbourne" },
    { name: "Avondale Heights", postcode: "3034", region: "Melbourne" },
    { name: "Beaumaris", postcode: "3193", region: "Melbourne" },
    { name: "Bentleigh", postcode: "3204", region: "Melbourne" },
    { name: "Blackburn", postcode: "3130", region: "Melbourne" },
    { name: "Bonbeach", postcode: "3196", region: "Melbourne" },
    { name: "Braybrook", postcode: "3019", region: "Melbourne" },
    { name: "Bulleen", postcode: "3105", region: "Melbourne" },
    { name: "Burwood East", postcode: "3151", region: "Melbourne" },
    { name: "Carrum", postcode: "3197", region: "Melbourne" },
    { name: "Carrum Downs", postcode: "3201", region: "Melbourne" },
    { name: "Chelsea", postcode: "3196", region: "Melbourne" },
    { name: "Cheltenham", postcode: "3192", region: "Melbourne" },
    { name: "Clayton", postcode: "3168", region: "Melbourne" },
    { name: "Cranbourne", postcode: "3977", region: "Melbourne" },
    { name: "Dandenong", postcode: "3175", region: "Melbourne" },
    { name: "Doncaster East", postcode: "3109", region: "Melbourne" },
    { name: "Doveton", postcode: "3177", region: "Melbourne" },
    { name: "Fawkner", postcode: "3060", region: "Melbourne" },
    { name: "Ferntree Gully", postcode: "3156", region: "Melbourne" },
    { name: "Frankston", postcode: "3199", region: "Melbourne" },
    { name: "Glen Waverley", postcode: "3150", region: "Melbourne" },
    { name: "Greensborough", postcode: "3088", region: "Melbourne" },
    { name: "Hallam", postcode: "3803", region: "Melbourne" },
    { name: "Hampton Park", postcode: "3976", region: "Melbourne" },
    { name: "Heidelberg", postcode: "3084", region: "Melbourne" },
    { name: "Highett", postcode: "3190", region: "Melbourne" },
    { name: "Hillside", postcode: "3037", region: "Melbourne" },
    { name: "Keysborough", postcode: "3173", region: "Melbourne" },
    { name: "Kilsyth", postcode: "3137", region: "Melbourne" },
    { name: "Kingsville", postcode: "3012", region: "Melbourne" },
    { name: "Knoxfield", postcode: "3180", region: "Melbourne" },
    { name: "Lalor", postcode: "3075", region: "Melbourne" },
    { name: "Langwarrin", postcode: "3910", region: "Melbourne" },
    { name: "Laverton", postcode: "3028", region: "Melbourne" },
    { name: "Lynbrook", postcode: "3975", region: "Melbourne" },
    { name: "Lysterfield", postcode: "3156", region: "Melbourne" },
    { name: "Maidstone", postcode: "3012", region: "Melbourne" },
    { name: "Malvern East", postcode: "3145", region: "Melbourne" },
    { name: "Mentone", postcode: "3194", region: "Melbourne" },
    { name: "Mitcham", postcode: "3132", region: "Melbourne" },
    { name: "Mont Albert", postcode: "3127", region: "Melbourne" },
    { name: "Montrose", postcode: "3765", region: "Melbourne" },
    { name: "Mordialloc", postcode: "3195", region: "Melbourne" },
    { name: "Mount Eliza", postcode: "3930", region: "Melbourne" },
    { name: "Mount Waverley", postcode: "3149", region: "Melbourne" },
    { name: "Mulgrave", postcode: "3170", region: "Melbourne" },
    { name: "Murrumbeena", postcode: "3163", region: "Melbourne" },
    { name: "Narre Warren", postcode: "3805", region: "Melbourne" },
    { name: "Niddrie", postcode: "3042", region: "Melbourne" },
    { name: "Noble Park", postcode: "3174", region: "Melbourne" },
    { name: "Oakleigh", postcode: "3166", region: "Melbourne" },
    { name: "Oakleigh South", postcode: "3167", region: "Melbourne" },
    { name: "Ormond", postcode: "3204", region: "Melbourne" },
    { name: "Pakenham", postcode: "3810", region: "Melbourne" },
    { name: "Parkdale", postcode: "3195", region: "Melbourne" },
    { name: "Patterson Lakes", postcode: "3197", region: "Melbourne" },
    { name: "Point Cook", postcode: "3030", region: "Melbourne" },
    { name: "Ringwood", postcode: "3134", region: "Melbourne" },
    { name: "Ringwood East", postcode: "3135", region: "Melbourne" },
    { name: "Ringwood North", postcode: "3134", region: "Melbourne" },
    { name: "Rowville", postcode: "3178", region: "Melbourne" },
    { name: "Scoresby", postcode: "3179", region: "Melbourne" },
    { name: "Seaford", postcode: "3198", region: "Melbourne" },
    { name: "Springvale", postcode: "3171", region: "Melbourne" },
    { name: "Sunshine", postcode: "3020", region: "Melbourne" },
    { name: "Sunshine North", postcode: "3020", region: "Melbourne" },
    { name: "Sunshine West", postcode: "3020", region: "Melbourne" },
    { name: "Surrey Hills", postcode: "3127", region: "Melbourne" },
    { name: "Sydenham", postcode: "3037", region: "Melbourne" },
    
    { name: "Taylors Lakes", postcode: "3038", region: "Melbourne" },
    { name: "Templestowe", postcode: "3106", region: "Melbourne" },
    { name: "Templestowe Lower", postcode: "3107", region: "Melbourne" },
    { name: "The Basin", postcode: "3154", region: "Melbourne" },
    { name: "Thomastown", postcode: "3074", region: "Melbourne" },
    { name: "Thornbury", postcode: "3071", region: "Melbourne" },
    { name: "Truganina", postcode: "3029", region: "Melbourne" },
    { name: "Tullamarine", postcode: "3043", region: "Melbourne" },
    { name: "Vermont", postcode: "3133", region: "Melbourne" },
    { name: "Vermont South", postcode: "3133", region: "Melbourne" },
    { name: "Wantirna", postcode: "3152", region: "Melbourne" },
    { name: "Wantirna South", postcode: "3152", region: "Melbourne" },
    { name: "Watsonia", postcode: "3087", region: "Melbourne" },    
    { name: "West Footscray", postcode: "3012", region: "Melbourne" },
    { name: "Westmeadows", postcode: "3049", region: "Melbourne" },
    { name: "Wheelers Hill", postcode: "3150", region: "Melbourne" },
    { name: "Williamstown North", postcode: "3016", region: "Melbourne" },
    { name: "Windsor", postcode: "3181", region: "Melbourne" },
    { name: "Yarraville", postcode: "3013", region: "Melbourne" },
    { name: "Albanvale", postcode: "3021", region: "Melbourne" },
    { name: "Albert Park", postcode: "3206", region: "Melbourne" },
    { name: "Alphington", postcode: "3078", region: "Melbourne" },
    { name: "Altona Meadows", postcode: "3028", region: "Melbourne" },
    { name: "Altona North", postcode: "3025", region: "Melbourne" },
    { name: "Ardeer", postcode: "3022", region: "Melbourne" },
    { name: "Aspendale", postcode: "3195", region: "Melbourne" },
    { name: "Aspendale Gardens", postcode: "3195", region: "Melbourne" },
    { name: "Attwood", postcode: "3049", region: "Melbourne" },
    { name: "Auburn", postcode: "3123", region: "Melbourne" },
    { name: "Aurora", postcode: "3076", region: "Melbourne" },
    { name: "Bacchus Marsh", postcode: "3340", region: "Melbourne" },
    { name: "Bayswater", postcode: "3153", region: "Melbourne" },
    { name: "Bayswater North", postcode: "3153", region: "Melbourne" },
    { name: "Beaconsfield", postcode: "3807", region: "Melbourne" },
    { name: "Beaconsfield Upper", postcode: "3808", region: "Melbourne" },
    { name: "Beaumaris", postcode: "3193", region: "Melbourne" },
    { name: "Belgrave", postcode: "3160", region: "Melbourne" },
    { name: "Bellfield", postcode: "3081", region: "Melbourne" },
    { name: "Bentleigh East", postcode: "3165", region: "Melbourne" },
    { name: "Berwick", postcode: "3806", region: "Melbourne" },
    { name: "Bittern", postcode: "3918", region: "Melbourne" },
    { name: "Black Rock", postcode: "3193", region: "Melbourne" },
    { name: "Blackburn North", postcode: "3130", region: "Melbourne" },
    { name: "Blackburn South", postcode: "3130", region: "Melbourne" },
    { name: "Bonbeach", postcode: "3196", region: "Melbourne" },
    { name: "Boronia", postcode: "3155", region: "Melbourne" },
    { name: "Botanic Ridge", postcode: "3977", region: "Melbourne" },
    { name: "Box Hill North", postcode: "3129", region: "Melbourne" },
    { name: "Box Hill South", postcode: "3128", region: "Melbourne" },
    { name: "Braybrook", postcode: "3019", region: "Melbourne" },
    { name: "Briar Hill", postcode: "3088", region: "Melbourne" },
    { name: "Broadmeadows", postcode: "3047", region: "Melbourne" },
    { name: "Brookfield", postcode: "3338", region: "Melbourne" },
    { name: "Brooklyn", postcode: "3012", region: "Melbourne" },
    { name: "Brunswick East", postcode: "3057", region: "Melbourne" },
    { name: "Brunswick West", postcode: "3055", region: "Melbourne" },
    { name: "Bulleen", postcode: "3105", region: "Melbourne" },
    { name: "Burnley", postcode: "3121", region: "Melbourne" },
    { name: "Burnside", postcode: "3023", region: "Melbourne" },
    { name: "Burnside Heights", postcode: "3023", region: "Melbourne" },
    { name: "Burwood", postcode: "3125", region: "Melbourne" },
    { name: "Cairnlea", postcode: "3023", region: "Melbourne" },
    { name: "Calder Park", postcode: "3037", region: "Melbourne" },
    { name: "Campbellfield", postcode: "3061", region: "Melbourne" },
    { name: "Canterbury", postcode: "3126", region: "Melbourne" },
    { name: "Carlton North", postcode: "3054", region: "Melbourne" },
    { name: "Carnegie", postcode: "3163", region: "Melbourne" },
    { name: "Caroline Springs", postcode: "3023", region: "Melbourne" },
    { name: "Carrum", postcode: "3197", region: "Melbourne" },
    { name: "Carrum Downs", postcode: "3201", region: "Melbourne" },
    { name: "Caulfield East", postcode: "3145", region: "Melbourne" },
    { name: "Caulfield North", postcode: "3161", region: "Melbourne" },
    { name: "Caulfield South", postcode: "3162", region: "Melbourne" },
    { name: "Chadstone", postcode: "3148", region: "Melbourne" },
    { name: "Chelsea Heights", postcode: "3196", region: "Melbourne" },
    { name: "Chirnside Park", postcode: "3116", region: "Melbourne" },
    { name: "Clarinda", postcode: "3169", region: "Melbourne" },
    { name: "Clayton South", postcode: "3169", region: "Melbourne" },
    { name: "Clematis", postcode: "3782", region: "Melbourne" },
    { name: "Coburg North", postcode: "3058", region: "Melbourne" },
    { name: "Coolaroo", postcode: "3048", region: "Melbourne" },
    { name: "Craigieburn", postcode: "3064", region: "Melbourne" },
    { name: "Cranbourne East", postcode: "3977", region: "Melbourne" },
    { name: "Cranbourne North", postcode: "3977", region: "Melbourne" },
    { name: "Cranbourne South", postcode: "3977", region: "Melbourne" },
    { name: "Cranbourne West", postcode: "3977", region: "Melbourne" },
    { name: "Cremorne", postcode: "3121", region: "Melbourne" },
    { name: "Croydon", postcode: "3136", region: "Melbourne" },
    { name: "Croydon Hills", postcode: "3136", region: "Melbourne" },
    { name: "Croydon North", postcode: "3136", region: "Melbourne" },
    { name: "Croydon South", postcode: "3136", region: "Melbourne" },
    { name: "Dallas", postcode: "3047", region: "Melbourne" },
    { name: "Dandenong North", postcode: "3175", region: "Melbourne" },
    { name: "Dandenong South", postcode: "3175", region: "Melbourne" },
    { name: "Deer Park", postcode: "3023", region: "Melbourne" },
    { name: "Delahey", postcode: "3037", region: "Melbourne" },
    { name: "Derrimut", postcode: "3030", region: "Melbourne" },
    { name: "Diamond Creek", postcode: "3089", region: "Melbourne" },
    { name: "Diggers Rest", postcode: "3427", region: "Melbourne" },
    { name: "Dingley Village", postcode: "3172", region: "Melbourne" },
    { name: "Donvale", postcode: "3111", region: "Melbourne" },
    { name: "Doreen", postcode: "3754", region: "Melbourne" },
    { name: "Eaglemont", postcode: "3084", region: "Melbourne" },
    { name: "East Melbourne", postcode: "3002", region: "Melbourne" },
    { name: "Edithvale", postcode: "3196", region: "Melbourne" },
    { name: "Eltham", postcode: "3095", region: "Melbourne" },
    { name: "Eltham North", postcode: "3095", region: "Melbourne" },
    { name: "Endeavour Hills", postcode: "3802", region: "Melbourne" },
    { name: "Epping", postcode: "3076", region: "Melbourne" },
    { name: "Essendon North", postcode: "3041", region: "Melbourne" },
    { name: "Essendon West", postcode: "3040", region: "Melbourne" },
    { name: "Eumemmerring", postcode: "3177", region: "Melbourne" },
    { name: "Exford", postcode: "3338", region: "Melbourne" },
    { name: "Fairfield", postcode: "3078", region: "Melbourne" },
    { name: "Ferntree Gully", postcode: "3156", region: "Melbourne" },
    { name: "Ferny Creek", postcode: "3786", region: "Melbourne" },
    { name: "Fingal", postcode: "3939", region: "Melbourne" },
    { name: "Fitzroy North", postcode: "3068", region: "Melbourne" },
    { name: "Flemington", postcode: "3031", region: "Melbourne" },
    { name: "Forest Hill", postcode: "3131", region: "Melbourne" },
    { name: "Frankston North", postcode: "3200", region: "Melbourne" },
    { name: "Frankston South", postcode: "3199", region: "Melbourne" },
    { name: "Gardenvale", postcode: "3185", region: "Melbourne" },
    { name: "Gembrook", postcode: "3783", region: "Melbourne" },
    { name: "Gisborne", postcode: "3437", region: "Melbourne" },
    { name: "Gisborne South", postcode: "3437", region: "Melbourne" },
    { name: "Gladstone Park", postcode: "3043", region: "Melbourne" },
    { name: "Glen Huntly", postcode: "3163", region: "Melbourne" },
    { name: "Glen Waverley", postcode: "3150", region: "Melbourne" },
    { name: "Glenroy", postcode: "3046", region: "Melbourne" },
    { name: "Gowanbrae", postcode: "3043", region: "Melbourne" },
    { name: "Greenvale", postcode: "3059", region: "Melbourne" },
    { name: "Guys Hill", postcode: "3807", region: "Melbourne" },
    { name: "Hadfield", postcode: "3046", region: "Melbourne" },
    { name: "Hallam", postcode: "3803", region: "Melbourne" },
    { name: "Hampton", postcode: "3188", region: "Melbourne" },
    { name: "Hampton East", postcode: "3188", region: "Melbourne" },
    { name: "Hampton Park", postcode: "3976", region: "Melbourne" },
    { name: "Harkaway", postcode: "3806", region: "Melbourne" },
    { name: "Hastings", postcode: "3915", region: "Melbourne" },
    { name: "Hawthorn East", postcode: "3123", region: "Melbourne" },
    { name: "Heatherton", postcode: "3202", region: "Melbourne" },
    { name: "Heathmont", postcode: "3135", region: "Melbourne" },
    { name: "Heidelberg Heights", postcode: "3081", region: "Melbourne" },
    { name: "Heidelberg West", postcode: "3081", region: "Melbourne" },
    { name: "Highett", postcode: "3190", region: "Melbourne" },
    { name: "Hillside", postcode: "3037", region: "Melbourne" },
    { name: "Hoppers Crossing", postcode: "3029", region: "Melbourne" },
    { name: "Hughesdale", postcode: "3166", region: "Melbourne" },
    { name: "Huntingdale", postcode: "3166", region: "Melbourne" },
    { name: "Hurstbridge", postcode: "3099", region: "Melbourne" },
    { name: "Ivanhoe East", postcode: "3079", region: "Melbourne" },
    { name: "Jacana", postcode: "3047", region: "Melbourne" },
    { name: "Junction Village", postcode: "3977", region: "Melbourne" },
    { name: "Kealba", postcode: "3021", region: "Melbourne" },
    { name: "Keilor", postcode: "3036", region: "Melbourne" },
    { name: "Keilor Downs", postcode: "3038", region: "Melbourne" },
    { name: "Keilor East", postcode: "3033", region: "Melbourne" },
    { name: "Keilor Park", postcode: "3042", region: "Melbourne" },
    { name: "Kensington", postcode: "3031", region: "Melbourne" },
    { name: "Kew East", postcode: "3102", region: "Melbourne" },
    { name: "Keysborough", postcode: "3173", region: "Melbourne" },
    { name: "Kilsyth", postcode: "3137", region: "Melbourne" },
    { name: "Kilsyth South", postcode: "3137", region: "Melbourne" },
    { name: "Kings Park", postcode: "3021", region: "Melbourne" },
    { name: "Kingsbury", postcode: "3083", region: "Melbourne" },
    { name: "Knoxfield", postcode: "3180", region: "Melbourne" },
    { name: "Kooyong", postcode: "3144", region: "Melbourne" },
    { name: "Kurunjang", postcode: "3337", region: "Melbourne" },
    { name: "Lalor", postcode: "3075", region: "Melbourne" },
    { name: "Langwarrin", postcode: "3910", region: "Melbourne" },
    { name: "Langwarrin South", postcode: "3911", region: "Melbourne" },
    { name: "Laverton", postcode: "3028", region: "Melbourne" },
    { name: "Laverton North", postcode: "3026", region: "Melbourne" },
    { name: "Lower Plenty", postcode: "3093", region: "Melbourne" },
    { name: "Lynbrook", postcode: "3975", region: "Melbourne" },
    { name: "Lyndhurst", postcode: "3975", region: "Melbourne" },
    { name: "Lysterfield", postcode: "3156", region: "Melbourne" },
    { name: "Lysterfield South", postcode: "3156", region: "Melbourne" },
    { name: "Macclesfield", postcode: "3782", region: "Melbourne" },
    { name: "Macleod", postcode: "3085", region: "Melbourne" },
    { name: "Maidstone", postcode: "3012", region: "Melbourne" },
    { name: "Malvern", postcode: "3144", region: "Melbourne" },
    { name: "Malvern East", postcode: "3145", region: "Melbourne" },
    { name: "Maribyrnong", postcode: "3032", region: "Melbourne" },
    { name: "Mckinnon", postcode: "3204", region: "Melbourne" },
    { name: "Meadow Heights", postcode: "3048", region: "Melbourne" },
    { name: "Melbourne Airport", postcode: "3045", region: "Melbourne" },
    { name: "Melton", postcode: "3337", region: "Melbourne" },
    { name: "Melton South", postcode: "3338", region: "Melbourne" },
    { name: "Melton West", postcode: "3337", region: "Melbourne" },
    { name: "Mentone", postcode: "3194", region: "Melbourne" },
    { name: "Mernda", postcode: "3754", region: "Melbourne" },
    { name: "Mickleham", postcode: "3064", region: "Melbourne" },
    { name: "Middle Park", postcode: "3206", region: "Melbourne" },
    { name: "Mill Park", postcode: "3082", region: "Melbourne" },
    { name: "Mitcham", postcode: "3132", region: "Melbourne" },
    { name: "Monbulk", postcode: "3793", region: "Melbourne" },
    { name: "Mont Albert", postcode: "3127", region: "Melbourne" },
    { name: "Mont Albert North", postcode: "3129", region: "Melbourne" },
    { name: "Montmorency", postcode: "3094", region: "Melbourne" },
    { name: "Montrose", postcode: "3765", region: "Melbourne" },
    { name: "Moonee Ponds", postcode: "3039", region: "Melbourne" },
    { name: "Moorabbin", postcode: "3189", region: "Melbourne" },
    { name: "Mooroolbark", postcode: "3138", region: "Melbourne" },
    { name: "Mordialloc", postcode: "3195", region: "Melbourne" },
    { name: "Mount Dandenong", postcode: "3767", region: "Melbourne" },
    { name: "Mount Evelyn", postcode: "3796", region: "Melbourne" },
    { name: "Mount Waverley", postcode: "3149", region: "Melbourne" },
    { name: "Mulgrave", postcode: "3170", region: "Melbourne" },
    { name: "Murrumbeena", postcode: "3163", region: "Melbourne" },
    { name: "Narre Warren", postcode: "3805", region: "Melbourne" },
    { name: "Narre Warren North", postcode: "3804", region: "Melbourne" },
    { name: "Narre Warren South", postcode: "3805", region: "Melbourne" },
    { name: "New Gisborne", postcode: "3438", region: "Melbourne" },
    { name: "Newport", postcode: "3015", region: "Melbourne" },
    { name: "Niddrie", postcode: "3042", region: "Melbourne" },
    { name: "Noble Park", postcode: "3174", region: "Melbourne" },
    { name: "Noble Park North", postcode: "3174", region: "Melbourne" },
    { name: "North Melbourne", postcode: "3051", region: "Melbourne" },
    { name: "North Warrandyte", postcode: "3113", region: "Melbourne" },
    { name: "Northcote", postcode: "3070", region: "Melbourne" },
    { name: "Notting Hill", postcode: "3168", region: "Melbourne" },
    { name: "Nunawading", postcode: "3131", region: "Melbourne" },
    { name: "Oak Park", postcode: "3046", region: "Melbourne" },
    { name: "Oaklands Junction", postcode: "3063", region: "Melbourne" },
    { name: "Oakleigh", postcode: "3166", region: "Melbourne" },
    { name: "Oakleigh East", postcode: "3166", region: "Melbourne" },
    { name: "Oakleigh South", postcode: "3167", region: "Melbourne" },
    { name: "Officer", postcode: "3809", region: "Melbourne" },
    { name: "Olinda", postcode: "3788", region: "Melbourne" },
    { name: "Ormond", postcode: "3204", region: "Melbourne" },
    { name: "Pakenham", postcode: "3810", region: "Melbourne" },
    { name: "Park Orchards", postcode: "3114", region: "Melbourne" },
    { name: "Parkdale", postcode: "3195", region: "Melbourne" },
    { name: "Parkville", postcode: "3052", region: "Melbourne" },
    { name: "Pascoe Vale", postcode: "3044", region: "Melbourne" },
    { name: "Pascoe Vale South", postcode: "3044", region: "Melbourne" },
    { name: "Patterson Lakes", postcode: "3197", region: "Melbourne" },
    { name: "Plenty", postcode: "3090", region: "Melbourne" },
    { name: "Plumpton", postcode: "3335", region: "Melbourne" },
    { name: "Point Cook", postcode: "3030", region: "Melbourne" },
    { name: "Port Melbourne", postcode: "3207", region: "Melbourne" },
    { name: "Prahran", postcode: "3181", region: "Melbourne" },
    { name: "Preston", postcode: "3072", region: "Melbourne" },
    { name: "Princes Hill", postcode: "3054", region: "Melbourne" },
    { name: "Ravenhall", postcode: "3023", region: "Melbourne" },
    { name: "Red Hill", postcode: "3937", region: "Melbourne" },
    { name: "Research", postcode: "3095", region: "Melbourne" },
    { name: "Reservoir", postcode: "3073", region: "Melbourne" },
    { name: "Richmond", postcode: "3121", region: "Melbourne" },
    { name: "Ringwood", postcode: "3134", region: "Melbourne" },
    { name: "Ringwood East", postcode: "3135", region: "Melbourne" },
    { name: "Ringwood North", postcode: "3134", region: "Melbourne" },
    { name: "Ripponlea", postcode: "3185", region: "Melbourne" },
    { name: "Rockbank", postcode: "3335", region: "Melbourne" },
    { name: "Rosanna", postcode: "3084", region: "Melbourne" },
    { name: "Rosebud", postcode: "3939", region: "Melbourne" },
    { name: "Rowville", postcode: "3178", region: "Melbourne" },
    { name: "Roxburgh Park", postcode: "3064", region: "Melbourne" },
    { name: "Rye", postcode: "3941", region: "Melbourne" },
    { name: "Safety Beach", postcode: "3936", region: "Melbourne" },
    { name: "St Albans", postcode: "3021", region: "Melbourne" },
    { name: "St Helena", postcode: "3088", region: "Melbourne" },
    { name: "St Kilda", postcode: "3182", region: "Melbourne" },
    { name: "St Kilda East", postcode: "3183", region: "Melbourne" },
    { name: "St Kilda West", postcode: "3182", region: "Melbourne" },
    { name: "Sandhurst", postcode: "3977", region: "Melbourne" },
    { name: "Sandringham", postcode: "3191", region: "Melbourne" },
    { name: "Scoresby", postcode: "3179", region: "Melbourne" },
    { name: "Seabrook", postcode: "3028", region: "Melbourne" },
    { name: "Seaford", postcode: "3198", region: "Melbourne" },
    { name: "Seddon", postcode: "3011", region: "Melbourne" },
    { name: "Selby", postcode: "3159", region: "Melbourne" },
    { name: "Sherbrooke", postcode: "3789", region: "Melbourne" },
    { name: "Skye", postcode: "3977", region: "Melbourne" },
    { name: "Somerton", postcode: "3062", region: "Melbourne" },
    { name: "Somerville", postcode: "3912", region: "Melbourne" },
    { name: "Sorrento", postcode: "3943", region: "Melbourne" },
    { name: "South Kingsville", postcode: "3015", region: "Melbourne" },
    { name: "South Morang", postcode: "3752", region: "Melbourne" },
    { name: "South Wharf", postcode: "3006", region: "Melbourne" },
    { name: "South Yarra", postcode: "3141", region: "Melbourne" },
    { name: "Southbank", postcode: "3006", region: "Melbourne" },
    { name: "Spotswood", postcode: "3015", region: "Melbourne" },
    { name: "Springvale", postcode: "3171", region: "Melbourne" },
    { name: "Springvale South", postcode: "3172", region: "Melbourne" },
    { name: "St Andrews", postcode: "3761", region: "Melbourne" },
    { name: "St Andrews Beach", postcode: "3941", region: "Melbourne" },
    { name: "Strathmore", postcode: "3041", region: "Melbourne" },
    { name: "Strathmore Heights", postcode: "3041", region: "Melbourne" },
    { name: "Sunbury", postcode: "3429", region: "Melbourne" },
    { name: "Sunshine", postcode: "3020", region: "Melbourne" },
    { name: "Sunshine North", postcode: "3020", region: "Melbourne" },
    { name: "Sunshine West", postcode: "3020", region: "Melbourne" },
    { name: "Surrey Hills", postcode: "3127", region: "Melbourne" },
    { name: "Sydenham", postcode: "3037", region: "Melbourne" },
    { name: "Tarneit", postcode: "3029", region: "Melbourne" },
    { name: "Taylors Hill", postcode: "3037", region: "Melbourne" },
    { name: "Taylors Lakes", postcode: "3038", region: "Melbourne" },
    { name: "Tecoma", postcode: "3160", region: "Melbourne" },
    { name: "Templestowe", postcode: "3106", region: "Melbourne" },
    { name: "Templestowe Lower", postcode: "3107", region: "Melbourne" },
    { name: "The Basin", postcode: "3154", region: "Melbourne" },
    { name: "The Patch", postcode: "3792", region: "Melbourne" },
    { name: "Thomastown", postcode: "3074", region: "Melbourne" },
    { name: "Thornbury", postcode: "3071", region: "Melbourne" },
    { name: "Toorak", postcode: "3142", region: "Melbourne" },
    { name: "Tootgarook", postcode: "3941", region: "Melbourne" },
    { name: "Travancore", postcode: "3032", region: "Melbourne" },
    { name: "Truganina", postcode: "3029", region: "Melbourne" },
    { name: "Tullamarine", postcode: "3043", region: "Melbourne" },
    { name: "Upwey", postcode: "3158", region: "Melbourne" },
    { name: "Vermont", postcode: "3133", region: "Melbourne" },
    { name: "Vermont South", postcode: "3133", region: "Melbourne" },
    { name: "Viewbank", postcode: "3084", region: "Melbourne" },
    { name: "Wantirna", postcode: "3152", region: "Melbourne" },
    { name: "Wantirna South", postcode: "3152", region: "Melbourne" },
    { name: "Warrandyte", postcode: "3113", region: "Melbourne" },
    { name: "Warrandyte South", postcode: "3134", region: "Melbourne" },
    { name: "Warranwood", postcode: "3134", region: "Melbourne" },
    { name: "Waterways", postcode: "3195", region: "Melbourne" },
    { name: "Watsonia", postcode: "3087", region: "Melbourne" },
    { name: "Watsonia North", postcode: "3087", region: "Melbourne" },
    { name: "Werribee", postcode: "3030", region: "Melbourne" },    
    { name: "West Footscray", postcode: "3012", region: "Melbourne" },
    { name: "West Melbourne", postcode: "3003", region: "Melbourne" },
    { name: "Westmeadows", postcode: "3049", region: "Melbourne" },
    { name: "Wheelers Hill", postcode: "3150", region: "Melbourne" },
    { name: "Whittlesea", postcode: "3757", region: "Melbourne" },
    { name: "Williams Landing", postcode: "3027", region: "Melbourne" },
    { name: "Windsor", postcode: "3181", region: "Melbourne" },
    { name: "Wollert", postcode: "3750", region: "Melbourne" },
    { name: "Woodstock", postcode: "3751", region: "Melbourne" },
    { name: "Wyndham Vale", postcode: "3024", region: "Melbourne" },
    { name: "Yallambie", postcode: "3085", region: "Melbourne" },
    { name: "Yarra Glen", postcode: "3775", region: "Melbourne" },
    { name: "Yarra Junction", postcode: "3797", region: "Melbourne" },
    { name: "Yarraville", postcode: "3013", region: "Melbourne" },
    { name: "Yellingbo", postcode: "3139", region: "Melbourne" },
    { name: "Yuroke", postcode: "3063", region: "Melbourne" }
  ];

export default function LocationSearch() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedSuburb, setSelectedSuburb] = useState<Suburb | null>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  // Filter suburbs based on search input
  const filteredSuburbs = suburbs.filter(suburb => 
    suburb.name.toLowerCase().includes(search.toLowerCase()) ||
    suburb.postcode.includes(search)
  )

  // Handle clicking outside of search component
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setShowSuggestions(true)
    setSelectedSuburb(null)
  }

  const handleSuburbSelect = (suburb: Suburb) => {
    setSelectedSuburb(suburb)
    setSearch(`${suburb.name} ${suburb.postcode}`)
    setShowSuggestions(false)

    // Store selected suburb in localStorage
    localStorage.setItem('selectedSuburb', JSON.stringify(suburb))

    // Trigger storage event for real-time updates
    window.dispatchEvent(new Event('storage'))
  }

  const handleCheckAvailability = () => {
    if (selectedSuburb) {
      router.push('/quick-book/service')
    }
  }

  return (
    <div className="max-w-2xl" ref={searchRef}>
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Enter suburb or postcode"
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg
              focus:outline-none focus:ring-2 ring-[#1E3D8F] focus:border-transparent"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        {/* Enhanced suggestions dropdown */}
        {showSuggestions && search.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-[300px] overflow-y-auto">
            {filteredSuburbs.length > 0 ? (
              filteredSuburbs.map((suburb) => (
                <button
                  key={`${suburb.name}-${suburb.postcode}`}
                  onClick={() => handleSuburbSelect(suburb)}
                  className="w-full px-4 py-3 text-left hover:bg-[#e6f0fa] 
                    transition-colors flex justify-between items-center border-b border-gray-100 last:border-0"
                >
                  <span className="font-medium">{suburb.name}</span>
                  <span className="text-gray-500">{suburb.postcode}</span>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-500">No locations found</div>
            )}
          </div>
        )}
      </div>

      <button
        className="mt-4 w-full bg-[#1E3D8F] text-white py-3 rounded-lg font-medium
          hover:bg-opacity-90 transition-colors disabled:opacity-50"
        disabled={!selectedSuburb}
        onClick={handleCheckAvailability}
      >
        Check Availability
      </button>

      {selectedSuburb && (
        <div className="mt-4 p-3 bg-[#e6f0fa] text-[#1E3D8F] rounded-lg">
          <p className="text-sm">
            ✓ We service {selectedSuburb.name} ({selectedSuburb.postcode})
          </p>
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium mb-2">Service Areas</h3>
        <p className="text-sm text-gray-600">
          We currently service all Melbourne metropolitan areas including inner city,
          eastern, western, northern and southern suburbs.
        </p>
      </div>
    </div>
  )
} 