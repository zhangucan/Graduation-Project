import * as bigscreenApi from '../../api/bigscreen'
import * as mapApi from '../../api/map'
export const Server = socket => {
  socket.on('bigscreentList', async data => {
    const layoutList = []
    const fetchGridLayoutList = await bigscreenApi.fetchGridLayoutList()
    for (let i = 0; i < fetchGridLayoutList.length; i++) {
      const gridItem = await bigscreenApi.fetchGridItems({ gridType: 'map', gridLayoutId: fetchGridLayoutList[i]._id }, 'component.id gridLayoutId')
      if (gridItem[0].component.id !== 'test') {
        const map = {
          data: await mapApi.fetchMap({ '_id': gridItem[0].component.id }),
          gridLayoutId: await gridItem[0].gridLayoutId
        }
        // const temp = {}
        // Object.assign(temp, map)
        // console.log(temp)
        console.log(map)
        await layoutList.push(map)
      }
    }
    socket.emit('fetchGridLayoutList', layoutList)
  })
}
