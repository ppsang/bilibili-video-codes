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