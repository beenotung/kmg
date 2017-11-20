type MapConnection = [number, number[]];

/**
 * only point to higher number, seed  for a mapping object
 * */
const MapConnections: MapConnection[] = [
  [1, [2, 12]]
  , [2, [3, 12, 13]]
  , [3, [4, 13]]
  , [4, [5, 13, 14, 15]]
  , [5, [6, 15, 16, 28]]
  , [6, [7, 16]]
  , [7, [8, 16, 17, 28]]
  , [8, [9, 17, 18, 19]]
  , [9, [10, 19]]
  , [10, [11, 19, 20]]
  , [11, [20]]
  , [12, [21, 22]]
  , [13, [14, 22, 25]]
  , [14, [15, 25, 26, 27]]
  , [15, [27, 28]]
  , [16, [28]]
  , [17, [18, 28, 31]]
  , [18, [19, 31, 32, 33]]
  , [19, [20, 33]]
  , [20, [33, 34, 35]]
  , [21, [22, 23, 24]]
  , [22, [24, 25]]
  , [23, [24, 37]]
  , [24, [25, 37, 38]]
  , [25, [26, 38]]
  , [26, [27, 38, 39]]
  , [27, [28, 29, 30, 39, 40]]
  , [28, [29]]
  , [29, [30, 31]]
  , [30, [31, 40, 41, 49]]
  , [31, [32, 41, 42]]
  , [32, [33, 42, 43]]
  , [33, [34, 43]]
  , [34, [35, 36, 43, 44]]
  , [35, [36]]
  , [36, [44]]
  , [37, [38, 45, 46]]
  , [38, [39, 46, 47]]
  , [39, [40, 47, 48, 52]]
  , [40, [49, 52, 53]]
  , [41, [42, 49, 54, 55]]
  , [42, [43, 55, 56, 58]]
  , [43, [44, 58, 59]]
  , [44, [59, 61]]
  , [45, [46, 50, 62, 72]]
  , [46, [47, 50]]
  , [47, [48, 50]]
  , [48, [50, 51, 52]]
  , [49, [53, 54, 66, 67, 76]]
  , [50, [51, 62, 63, 64]]
  , [51, [52, 64]]
  , [52, [53, 64, 65, 66]]
  , [53, [66]]
  , [54, [55, 67]]
  , [55, [56, 57, 58, 59, 67]]
  , [56, [57, 58, 60]]
  , [57, [60, 69, 70]]
  , [58, [59, 60]]
  , [59, [60, 61]]
  , [60, [61, 69, 70, 71]]
  , [61, [71, 81]]
  , [62, [63, 72, 73]]
  , [63, [64, 65, 73]]
  , [64, [65]]
  , [65, [66, 73, 74, 75]]
  , [66, [75, 76]]
  , [67, [68, 76, 78]]
  , [68, [69, 70, 78, 79, 80]]
  , [69, [70]]
  , [70, [71, 80]]
  , [71, [80, 81]]
  , [72, [73, 87, 88]]
  , [73, [74, 88, 89]]
  , [74, [89, 94]]
  , [75, [76, 77, 94, 95, 96]]
  , [76, [77, 78]]
  , [77, [78, 96]]
  , [78, [79, 96, 97, 98]]
];
