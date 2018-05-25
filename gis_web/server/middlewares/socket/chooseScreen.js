import * as bigscreenApi from '../../api/bigscreen'
import * as mapApi from '../../api/map'
export const Server = socket => {
  socket.on('bigscreentList', async data => {
    const layoutList = []
    for (let i = 0; i < data.length; i++) {
      const gridItem = await bigscreenApi.fetchGridItems({ gridType: 'map', gridLayoutId: data[i] })
      if (gridItem[0].component.id !== 'test') {
        const map = {
          data: await mapApi.fetchMap({ '_id': gridItem[0].component.id }),
          gridLayoutId: await gridItem[0].gridLayoutId
        }
        // const temp = {}
        // Object.assign(temp, map)
        // console.log(temp)
        console.log(map)
        layoutList.push(map)
      }
    }
    socket.emit('fetchGridLayoutList', layoutList)
  })
}
