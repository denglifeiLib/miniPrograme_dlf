//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    step: 1,
    devicePosition: 'front',
    src: ''
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res)
        wx.showModal({
          title: '是否拍摄完成',
          content: '文字描述' + res.tempImagePath,
          cancelText: '重新拍摄',
          success: (res_2)=> {
            if (res_2.confirm) {
              console.log('用户点击确定');
              let nextPath = 'baidu.com';
              let curStep = this.data.step;
              if (curStep===1) {
                this.setData({
                  step: 2
                })
              }
              if (curStep === 2) {
                wx.navigateTo({
                  url: '/pages/logs/logs?id=1'
                })
              }
            } else if (res_2.cancel) {
              console.log('用户点击取消')
            }
          }
        });

        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },

  changeDevicePosition() {
    this.setData({
      devicePosition: this.data.devicePosition === 'front' ? 'back' : 'front'
    })
  },

  error(e) {
    console.log(e.detail)
    wx.showModal({
      title: '拍摄出错',
      content: '用户不允许使用摄像头时触发，文案待定',
      showCancel: false,
      success(res_2) {
        if (res_2.confirm) {
          console.log('用户点击确定')
        } else if (res_2.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  }
})
