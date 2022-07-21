const { app, BrowserWindow } = require('electron')

const path = require('path')
const isDev = require('electron-is-dev')

require('@electron/remote/main').initialize()  // giúp kết hợp đa dạng luồng 

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true  // linh hoạt chạy nhiều luồng đi đến react component 
    }
  })
  win.loadURL(
    isDev // nếu là môi trường dev thì load ở cổng 3000
          // nếu không phải môi trường dev thì load từ file 
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`// thằng index trong react nó build xong thì nó đổ về file này 
        // lúc chạy ở môi trường không phải môi trường dev thì thì chạy file index.html 
      // qua 2 chặng mới tới index.js 
  )
}

// listen event
app.on('ready', createWindow)  // sẵn sàng tạo ra window 

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})