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
];
