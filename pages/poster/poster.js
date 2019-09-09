// pages/poster/poster.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this

    // 获取设备宽高，以备海报全屏显示

    wx.getSystemInfo({

      success: function (res) {

        that.setData({

          windowW: res.windowWidth,

          windowH: res.windowHeight

        })

      },

    })

    // 海报背景图线上地址

    var url = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567516968515&di=f5a73c20fde2594eeba03bf08918812e&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F00%2F79%2F36%2F58c73f8130500_610.jpg'

    // 商品图片线上地址

    var urll = 'http://img4.imgtn.bdimg.com/it/u=3760915994,1755866790&fm=26&gp=0.jpg'

    // 小程序二维码

    var urlqCord = 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=567838369,2634694507&fm=26&gp=0.jpg'

    that.getBG(url).then(function (locationData) {

      that.setData({

        bgpic: locationData

      })

    })

    that.getBG(urll).then(function (locationData) {

      that.setData({

        propic: locationData

      })

    })

    that.getBG(urlqCord).then(function (locationData) {

      that.setData({

        qCord: locationData

      })

    })

  },

  // 点击生成并保持海报到手机相册

  clickMe() {

    var that = this

    that.setData({

      show: true

    })

    that.drawCanvas()

  },

  // 绘制canvas

  drawCanvas() {

    var that = this

    var windowW = that.data.windowW

    var windowH = that.data.windowH

    // 使用 wx.createContext 获取绘图上下文 context

    var context = wx.createCanvasContext('firstCanvas')

    // 海报背景图

    context.drawImage(that.data.bgpic, 0, 0, windowW, windowH)

    // 商品图片

    context.drawImage(that.data.propic, 0, (windowH - 330) / 2, windowW, 250)

    // 商品文字描述

    context.setFontSize(20)

    context.setFillStyle("#000000")

    context.fillText('江淮帅铃 152马力4X215 载货车', (windowW - 340) / 2, (windowH - 520) / 2)


    context.setFontSize(12)

    context.setFillStyle("#BFBFBF")

    context.fillText('车辆编号：fs51g6445465', (windowW - 340) / 2, (windowH - 480) / 2)


    context.setFontSize(22)

    context.setFillStyle("#C94333")

    context.fillText('36万', (windowW - 340) / 2, (windowH - 410) / 2)

    context.setFontSize(14)

    context.setFillStyle("#000000")

    context.fillText('首付款', (windowW - 230) / 2, (windowH - 410) / 2)

    // context.setFontSize(14)

    context.setFillStyle("#C94333")

    context.fillText('6.0万', (windowW - 140) / 2, (windowH - 410) / 2)

    // context.setFontSize(14)

    context.setFillStyle("#000")

    context.fillText('广东省-深圳市 / 2015年11月 / 59.0万公里', (windowW - 340) / 2, (windowH - 360) / 2)


    // context.setFontSize(14)

    context.setFillStyle("#000")

    context.fillText('品牌：江淮', (windowW - 340) / 2, (windowH + 230) / 2)
    context.fillText('燃油排放：国五', (windowW - 340) / 2, (windowH + 270) / 2)
    context.fillText('发动机型号：Us5f4', (windowW - 340) / 2, (windowH + 310) / 2)
    context.fillText('驱动：4*2', (windowW - 340) / 2, (windowH + 350) / 2)
    context.fillText('马力：375', (windowW - 340) / 2, (windowH + 390) / 2)
    context.fillText('变速箱品牌：法土特', (windowW - 340) / 2, (windowH + 430) / 2)
    context.fillText('燃油类型：柴油', (windowW - 340) / 2, (windowH + 470) / 2)
    context.fillText('保险到期：2019年11月', (windowW - 340) / 2, (windowH + 510) / 2)

    // context.setFontSize(18)

    // context.setFillStyle("#999999")

    // context.fillText('￥99.99', (windowW + 50) / 2, (windowH + 55) / 2)

    // context.moveTo((windowW + 45) / 2, (windowH + 44) / 2); //设置线条的起始路径坐标

    // context.lineTo((windowW + 200) / 2, (windowH + 44) / 2); //设置线条的终点路径坐标

    // context.stroke(); //对当前路径进行描边

    // 商品名字，名字很长调用方法将文字折行，传参 文字内容text，画布context

    // var row = that.newLine(text, context)

    // var a = 24//定义行高25

    // for (var i = 0; i < row.length; i++) {

    //   context.setFontSize(16)

    //   context.setFillStyle("#000000")

    //   context.fillText(row[i], (windowW - 195) / 2, (windowH + 130) / 2 + a * i, 320)

    // }

    // 识别小程序二维码

    context.drawImage(that.data.qCord, (windowW + 80) / 2, (windowH + 220) / 2, 120, 120)

    context.setFillStyle("#000000")

    context.setFontSize(16)

    context.fillText('长按了解更多', (windowW + 100) / 2, (windowH + 500) / 2)

    context.setFillStyle("#000000")


    context.draw(false, () => {
      wx.showLoading({
        title: '加载中'
      })
      setTimeout(()=>{

        // 生成海报
        wx.canvasToTempFilePath({

          x: 0,

          y: 0,

          canvasId: 'firstCanvas',

          fileType: 'jpg',

          quality: 1,

          success: function (res) {

            wx.hideLoading();

            console.log(res.tempFilePath)

            wx.previewImage({

              current: res.tempFilePath, // 当前显示图片的http链接  

              urls: [res.tempFilePath], // 需要预览的图片http链接列表  

            })

          }

        })
        
      },500)

    });

  },


  //将线上图片地址下载到本地，此函数进行了封装，只有在需要转换url的时候调用即可

  getBG(url) {

    // Promise函数给我很大的帮助，让我能return出回调函数中的值

    return new Promise(function (resolve) {

      wx.downloadFile({

        url: url,

        success: function (res) {

          url = res.tempFilePath

          resolve(url);

        }

      })

    })

  },

  // canvas多文字换行

  newLine(txt, context) {

    var txtArr = txt.split('')

    var temp = ''

    var row = []

    for (var i = 0; i < txtArr.length; i++) {

      if (context.measureText(temp).width < 210) {

        temp += txtArr[i]

      } else {

        i--

        row.push(temp)

        temp = ''

      }

    }

    row.push(temp)

    //如果数组长度大于3 则截取前三个

    if (row.length > 3) {

      var rowCut = row.slice(0, 3);

      var rowPart = rowCut[2];

      var test = "";

      var empty = [];

      for (var a = 0; a < rowPart.length; a++) {

        if (context.measureText(test).width < 180) {

          test += rowPart[a];

        } else {

          break;

        }

      }

      empty.push(test);

      var group = empty[0] + "..." //这里只显示三行，超出的用...表示

      rowCut.splice(2, 1, group);

      row = rowCut;

    }

    return row

  },

  // 将商品分享图片保存到本地

  // eventSave() {

  //   wx.saveImageToPhotosAlbum({

  //     filePath: this.data.shareImage,

  //     success(res) {

  //       wx.showToast({

  //         title: '保存图片成功',

  //         icon: 'success',

  //         duration: 2000

  //       })

  //     }

  //   })

  // },

  // 生成图片展示
  // distinguishQCode(){
  //   var that = this;

  //   wx.previewImage({

  //     current: that.data.shareImage, // 当前显示图片的http链接  

  //     urls: [that.data.shareImage], // 需要预览的图片http链接列表  

  //   })
        
  // },

  // 长按
  // longpress(){
  //   var _this = this;
  //   wx.showActionSheet({
  //     itemList: ['保存图片', '识别图中二维码'],
  //     success(res) {
  //       console.log(res.tapIndex)
  //       if (res.tapIndex === 0) { //保存图片
  //         _this.eventSave();
  //       } else if (res.tapIndex === 1) { //识别图中二维码
  //         _this.distinguishQCode();          
  //       }
  //     },
  //     fail(res) {
  //       console.log(res.errMsg)
  //     }
  //   })
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})