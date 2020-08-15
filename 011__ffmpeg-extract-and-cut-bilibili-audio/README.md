## 视频中提取部分音频

> B站: [【工具】只需两步, 轻松从B站视频提取出你想要的音频片段](https://www.bilibili.com/video/BV1yV411z7UH/)

### 前置条件

1. 安装 youtube-dl: `pip install youtube-dl`
2. 安装 ffmpeg: [下载地址](https://ffmpeg.org/download.html)

### 命令

下载视频: `youtube-dl -x --audio-format mp3 https://www.bilibili.com/video/BV1f4411M7QC/`
剪切音频: `ffmpeg -ss 01:50 -to 02:10 -i 4k.mp3 -c copy 4k-part2.mp3`

### 参考链接

1. https://github.com/ytdl-org/youtube-dl
2. https://ffmpeg.org/download.html
3. https://ffmpeg.org/ffmpeg.html#Main-options
4. https://stackoverflow.com/questions/18444194/cutting-the-videos-based-on-start-and-end-time-using-ffmpeg
5. https://askubuntu.com/questions/423508/can-i-directly-download-audio-using-youtube-dl
6. https://ostechnix.com/youtube-dl-tutorial-with-examples-for-beginners/