//logs.js
import _ from '../../utils/util';
import htmlToWxml from '../../components/htmlToWxml';

Page({
  data: {
    article: {
      id: 123,
      title: '合乎你天性的生活就是最好的',
      resource: 'Google News',
      timestamp: _.msToDate(1497082010307, 'yyyy-MM-dd'),
      info: htmlToWxml.html2json('<p><img alt=\"null\" src=\"https://d.ifengimg.com/w480/img1.ugc.ifeng.com/newugc/20170610/20/wemedia/a7ecc4196ed2f27924c58c68ba19916b53ceb441_size275_w547_h352.png\"></p><p>北京时间6月10日，中国U22男足国家队在湘潭与马来西亚U22男足国家队进行热身赛。最终凭借开场不到1分钟韦世豪助攻向柏旭的破门，中国队1-0取胜。</p><p>中国U22男足国家队目前处于里皮总控，马达洛尼遥控指挥，德罗索执行挂帅的状态，在技战术打法和体系上，“里记大国家队”强调一脉相承。此役U22国足中，备受关注的陈泽鹏、黄政宇、唐诗、韦世豪、张修维等领衔首发。</p><p>比赛刚开始不到1分钟，国足首次进攻通过左边路的一次突破，韦世豪禁区内得球后没有任何犹豫，直接加速突破摆脱4名防守，随即传中助攻向柏旭头球破门，中国队1-0取得领先。闪击后中国队机会不多，双方在中场展开争夺，韦世豪在前场非常活跃。</p><p>第27分钟，韦世豪禁区前拿球，连续摆脱后一脚远射没打上力量，对方门将将球没收。现场很炎热，球员们也进行了补水。马来西亚反击无力，中国队面对对手的防线也没有太好的办法。第40分钟，马来西亚组成一次成功反击，拉希德转身抽射被挡出，禁区弧的伊斯哈克得球左脚再射打高。</p><img alt=\"null\" src=\"https://d.ifengimg.com/w480/img1.ugc.ifeng.com/newugc/20170610/20/wemedia/a7ecc4196ed2f27924c58c68ba19916b53ceb441_size275_w547_h352.png\"><p>第43分钟，韦世豪加速横向盘带过掉两人被放倒，由于对裁判判罚不满，韦世豪吃到一张黄牌。上半场补时阶段，唐诗任意球直接射门打高。</p><p>第51分钟，拉希德禁区前沿得球，在无人看防的情况下稍稍打偏，中国队逃过一劫。中国队中场失势，之后马来西亚连续获得进攻机会，扎努丁一脚打门稍稍偏出了左侧立柱。被动局势下中国队选择换人，王靖斌、刘浩上场。第64分钟，韦世豪直塞，陈哲超获得单刀，但未能晃过门将错失机会。</p><p>第74分钟，何超中场直塞，王靖斌获得单刀但越位在先。第81分钟，马来西亚获得机会，左路传中到后点，塞尔法拉加头球攻门被周煜辰扑了一下，皮球击中门框，刘洋再头球解围化解险情，中国队逃过一劫。第84分钟，唐诗直塞，王靖斌转身获得单刀，面对门将射门被扑出。</p><p>伤停补时阶段，高海生劲射被扑出。最终中国队1-0小胜对手。（艾马）</p><img alt=\"null\" src=\"https://d.ifengimg.com/w480/img1.ugc.ifeng.com/newugc/20170610/20/wemedia/a7ecc4196ed2f27924c58c68ba19916b53ceb441_size275_w547_h352.png\"><img alt=\"null\" src=\"https://d.ifengimg.com/w480/img1.ugc.ifeng.com/newugc/20170610/20/wemedia/a7ecc4196ed2f27924c58c68ba19916b53ceb441_size275_w547_h352.png\"><p>中国男足U22首发：23-周煜辰、4-陈泽鹏、5-刘军帅、6-黄政宇(60`刘浩)、7 - 唐诗、8 - 向柏旭(60`王靖斌)、9-韦世豪、17-何超、19-刘洋、27-陈哲超(91`高海生) 、32 - 张俢维 </p><p>马来西亚首发：19-卡西姆、5-扎努丁、7-凯奇克、9-阿兹林、10-塞萨斯瓦姆、12纳达拉贾赫、16-拉希德、17-扎卡利亚、20-萨法里、21-伊斯哈克</p >')
    },
    errorMsg: '暂时没有数据哦~',
    hasData: true,
    showLoading: false
  },
  onLoad: function () {
  },
  onShareAppMessage: function () {
    const self = this;
    return {
      title: '付勋教你来读书，' + self.data.article.title,
      path: '/pages/detail/detail?id=' + self.data.article.id,
      success: function (res) {
        // 转发成功
        console.log(res);
      },
      fail: function (res) {
        // 转发失败
        console.log(res.errMsg);
      }
    };
  },
  reloadData: function () {
    console.log('reloadData');
  }
});
