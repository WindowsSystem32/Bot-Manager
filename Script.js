const scriptName = "봇 관리자";
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */
const aU = {"DEBUG SENDER":"124ae6b2dede3ce3821c1aed8639fce0e185ea86"};
const pre = "^";
/**
 * 0: 디버그
 * 1: 알림
 * 2: 정보
 * 3: 오류
 * 4: 경고
 */
const aI = ["⚗", "🟢", "🔵", "🔴", "🟡"];
const lw = "\u200b".repeat(1000);
const lw2 = "전체보기를 눌러 확인하세요!" + lw;
const ln = "\n";
const sLen = 3;
var sS = {};
var sS2 = {};
var sS3 = {};
var sS4 = {};
var sL = {};
var sSvd = {};
/**
 * 0: 일반
 * 1: 스크립트 새로 로드(스크립트 저장 안 됨)
 */
var m = {};
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  var hash = String(imageDB.getProfileSHA());
  if (aU[sender] == hash) {
    if (m[sender] == 0 || iN(m[sender])) {
      if (iN(m[sender])) {
        m[sender] = 0;
      }
      if (msg.startsWith(pre)) {
        msg = msg.substr(pre.length);
        if (msg == "목록") {
          var sLst = Api.getScriptNames();
          var prn1 = "스크립트";
          if (sLst.length <= 0) {
            prn1 += "가 없어요!";
          } else {
            if (sLst.length <= sLen) {
              prn1 += "는";
            } else {
              prn1 += " 목록입니다!" + ln + 
              lw2;
            }
            prn1 += ln + 
            sLst.join("," + ln);
          }
          replier.reply(prn1);
        } else if (msg == "스크립트") {
          replier.reply("현재 선택된 스크립트는 " + (iN(sS[sender])? "없습" : "'" + sS[sender] + "' 입") + "니다.");
        } else if (msg.startsWith("스크립트 ")) {
          msg = msg.substr(5);
          var rSR = rS(msg);
          if (iN(rSR)) {
            replier.reply(aI[3] + "스크립트를 읽을 수 없어요!");
          } else {
            if (!(!iN(sS[sender]) && sSvd == false)) {
              sS[sender] = msg;
              sS2[sender] = rSR;
              sSvd[sender] = true;
            } else {
              replier.reply(aI[1] + "현재 편집 중이며, 저장되지 않은 스크립트가 있습니다." + ln + 
              "저장, 무시, 취소 중 어떤 것을 선택하시겠습니까?" + ln + 
              " - 저장: 편집 중인 스크립트를 저장하고 선택한 스크립트를 불러옵니다." + ln + 
              " - 무시: 편집 중인 스크립트를 저장하지 않고 선택한 스크립트를 불러옵니다." + ln + 
              " - 취소: 선택한 스크립트를 불러오지 않고 편집을 계속합니다.");
              sS3[sender] = msg;
              sS4[sender] = rSR;
              m[sender] = 1;
            }
          }
        } else if (msg == "줄") {
          replier.reply("현재 선택된 줄은 " + (iN(sL[sender])? "없습" : sL[sender] + "번째 줄입") + "니다.");
        } else if (msg.startsWith("줄 ")) {
          msg = msg.substr(2);
          if (!iN(sS[sender])) {
            var l = strToNum2(msg);
            if (l >= 1 && l <= sS2[sender].length) {
              sL[sender] = l;
            } else {
              replier.reply(aI[2] + "줄 명령어 사용법: " + pre + "줄 [선택할 줄의 번호, 1 이상 줄 개수 이하의 숫자]");
            }
          } else {
            replier.reply(aI[4] + "스크립트를 먼저 선택해 주세요!");
          }
        } else if (msg.startsWith("수정 ")) {
          if (!iN(sS[sender])) {
            if (!iN(sL[sender])) {
              sS2[sender][sL[sender] - 1] = msg.substr(3);
              if(msg.substr(3).includes(ln)){
                replier.reply('줄바꿈이 감지되었습니다. 새로고침 합니다!');
                sS2[sender] = sS2[sender].join(ln).split(ln);
              }
              sSvd[sender] = false;
            } else {
              replier.reply(aI[4] + "편집할 줄을 먼저 선택해 주세요!");
            }
          } else {
            replier.reply(aI[4] + "편집할 스크립트를 먼저 선택해 주세요!");
          }
        } else if (msg == "로그") {
          if (!iN(sS[sender])) {
            replier.reply(aI[1] + "로그를 불러오는 중입니다!");
            replier.reply(lL3(sS[sender]));
          } else {
            replier.reply(aI[4] + "스크립트를 먼저 선택해 주세요!");
          }
        } else if (msg.startsWith("로그 ")) {
          replier.reply(aI[1] + "로그를 불러오는 중입니다!");
          replier.reply(lL3(msg.substring(3)));
        } else if (msg == "글로벌 로그") {
          replier.reply(aI[1] + "로그를 불러오는 중입니다!");
          replier.reply(lL3_2("/sdcard/msgbot/GLOBAL_LOG.json"));
        } else if (msg == "저장") {
          replier.reply(wS(sS[sender], sS2[sender].join(ln))? aI[2] + "편집 중이던 스크립트를 저장하였습니다!" : aI[3] + "스크립트 저장에서 문제가 발생하였습니다.." + ln + 
          "편집 중이던 스크립트:" + ln + 
          lw2 + ln + 
          sS2[sender].join(ln));
        } else if (msg == "전체 코드") {
          if (!iN(sS[sender])) {
            replier.reply(sS2[sender].map((e, i) => (i + 1 + '').padStart((sS2[sender].length + '').length, '0') + "| " + e).join(ln));
          } else {
            replier.reply(aI[4] + "스크립트를 먼저 선택해 주세요!");
          }
        } else if (msg == "전체 코드_nl") {
          if (!iN(sS[sender])) {
            replier.reply(sS2[sender].join(ln));
          } else {
            replier.reply(aI[4] + "스크립트를 먼저 선택해 주세요!");
          }
        } else if (msg == "코드") {
          if (!iN(sS[sender])) {
            if (!iN(sL[sender])) {
              replier.reply((sL[sender] + '').padStart((sS2[sender].length + '').length) + "| " + sS2[sender][sL[sender] - 1]);
            } else {
              replier.reply(aI[4] + "줄을 먼저 선택해 주세요!");
            }
          } else {
            replier.reply(aI[4] + "스크립트를 먼저 선택해 주세요!");
          }
        } else if (msg == "컴파일") {
          if (!iN(sS[sender])) {
            replier.reply(aI[1] + "컴파일 중...");
            replier.reply(Api.compile(sS[sender])? aI[2] + "컴파일 성공!" : aI[3] + "컴파일 실패!");
          } else {
            replier.reply(aI[4] + "스크립트를 먼저 선택해 주세요!");
          }
        } else if (msg.startsWith("컴파일 ")) {
          replier.reply(aI[1] + "컴파일 중...");
          replier.reply(Api.compile(msg.substr(4))? aI[2] + "컴파일 성공!" : aI[3] + "컴파일 실패!");
        } else if (msg == "전원") {
          if (!iN(sS[sender])) {
            replier.reply("이 스크립트의 전원은 " + (Api.isOn(sS[sender])? "켜" : "꺼") + "져 있습니다.");
          } else {
            replier.reply(aI[4] + "스크립트를 먼저 선택해 주세요!");
          }
        } else if (msg.startsWith("전원 ")) {
          msg = msg.substr(3);
          replier.reply("'" + msg + "' 스크립트의 전원은 " + (Api.isOn(msg)? "켜" : "꺼") + "져 있습니다.");
        } else if (msg == "켜기" || msg.toLowerCase() == "on") {
          if (!iN(sS[sender])) {
            var res1 = Api.on(sS[sender]);
            replier.reply((res1? aI[2] : aI[3]) + "이 스크립트의 전원을 " + (res1? "켰" : "켜지 못했") + "습니다.");
          } else {
            replier.reply(aI[4] + "스크립트를 먼저 선택해 주세요!");
          }
        } else if (msg.startsWith("켜기 ") || msg.toLowerCase().startsWith("on ")) {
          msg = msg.substr(3);
          var res2 = Api.on(msg);
          replier.reply((res2? aI[2] : aI[3]) + "'" + msg + "' 스크립트의 전원을 " + (res2? "켰" : "켜지 못했") + "습니다.");
        } else if (msg == "끄기" || msg.toLowerCase() == "off") {
          if (!iN(sS[sender])) {
            var res3 = Api.off(sS[sender]);
            replier.reply((res3? aI[2] : aI[3]) + "이 스크립트의 전원을 " + (res3? "껐" : "끄지 못했") + "습니다.");
          } else {
            replier.reply(aI[4] + "스크립트를 먼저 선택해 주세요!");
          }
        } else if (msg.startsWith("끄기 ") || msg.toLowerCase().startsWith("off ")) {
          msg = msg.substr(msg.startsWith("끄기 ")? 3 : 4);
          var res4 = Api.on(msg);
          replier.reply((res4? aI[2] : aI[3]) + "'" + msg + "' 스크립트의 전원을 " + (res4? "껐" : "끄지 못했") + "습니다.");
        } else if (msg.startsWith("복제 ")) {
          msg = msg.substr(3);
          if (!iN(sS[sender])) {
            var res5 = false;
            var res6 = '';
            try {
              sS2[sender] = getSrc(msg).split(ln);
              delete sL[sender];
              res5 = true;
            } catch(e) {
              res6 = ln + e;
            }
            replier.reply((res5? aI[2] : aI[3]) + "'" + msg + "'(으)로부터 스크립트를 복제" + (res5? "했" : "하지 못했") + "습니다: " + res6);
          } else {
            replier.reply(aI[4] + "스크립트를 먼저 선택해 주세요!");
          }
        } else if (msg.startsWith("생성 ")) {
          msg = msg.substr(3);
          if (msg.startsWith(/[1-3] /)) {
            //msg = msg.substr(2);
            try {
              crSrc(msg.substr(2), ((Number(msg[0]) <= 2)? 1 : 2), true, (Number(msg[0] == 2)))
            } catch (e) {
              var eM = '' + e;
              if (eM == "scriptName") {
                replier.reply(aI[3] + "스크립트 이름에 특수문자가 들어가면 안됩니다!");
              } else {
                replier.reply(aI[3] + "기타 오류:" + ln + 
                eM);
              }
            }
          } else {
            replier.reply(aI[2] + "사용법:" + ln + 
            pre + "생성 [1-3] [스크립트 이름, 특수문자 포함 X]" + ln + 
            " - 1: 레거시 API, 매개변수 통합 X," + ln + 
            " - 2: 레거시 API, 매개변수 통합 O," + ln + 
            " - 3: API2");
          }
        }
      }
    } else if (m[sender] == 1) {
      if (msg == "저장" || msg == "무시" || msg == "취소") {
        if (msg == "저장" || msg == "무시") {
          if (msg == "저장") {
            replier.reply(wS(sS[sender], sS2[sender].join(ln))? aI[2] + "편집 중이던 스크립트를 저장하였습니다!" : aI[3] + "스크립트 저장에서 문제가 발생하였습니다.." + ln + 
            "편집 중이던 스크립트:" + ln + 
            lw2 + ln + 
            sS2[sender].join(ln));
          }
          sSvd[sender] = true;
          sS[sender] = dCp(sS3[sender]);
          sS2[sender] = dCp(sS4[sender]);
          replier.reply(aI[2] + "스크립트를 불러왔습니다!");
        }
        delete sS3[sender];
        delete sS4[sender];
      }
    }
  } else {
    if (msg.startsWith(pre)) {
      msg = msg.substring(pre.length);
      if (msg == "해시" || msg == "hash") {
        replier.reply("당신의 해시(SHA)는 '" + hash + "'입니다!");
      }
    }
  }
}

function lL3_2(lP) {
  var sLog = lL(lP);
  return "'" + lP + "'의 로그" + (sLog == null? "를 읽을 수 없습니다." : "입니다." + ln + 
  lw2 + ln + 
  sLog);
}

function lL3(sN) {
  return lL3_2(sD(sN) + "log.json");
}

function lL(lP) {
  /*
    {"a":"Log.i","b":1,"c":"2022/02/02 11:28:41 "},
    {"a":"Log.d","b":2,"c":"2022/02/02 11:28:41 "},
    {"a":"Log.e","b":3,"c":"2022/02/02 11:28:41 "}
    {"a":"로그 내용","b":1/2/3(1: 정보, 2: 디버그, 3: 오류),"c":"yyyy/MM/dd hh:mm:ss"}
  */
  FLog(0, "lL('" + lP + "')");
  try {
    return JSON.parse(FileStream.read(lP)).map((e) => (["🔵", "⚗", "🔴"])[clamp(e.b, 1, 3) - 1] + e.a + ln + 
    e.c).join(ln + 
      ln);
  } catch (e) {
    FLog(3, "Error on lL():" + ln + 
    "Error:" + ln + 
    e + ln + 
    "[line:" + e.lineNumber + "]" + ln + 
    "lP:" + ln + 
    lP);
    return null;
  }
}

function clamp(v1, v2, v3) {
  try {
    if (v1 < Math.min(v2, v3)) {
      v1 = Math.min(v2, v3);
    } else if (v1 > Math.max(v2, v3)) {
      v1 = Math.max(v2, v3);
    }
  } catch(e) {}
  return v1;
}

function dCp(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function iN(obj) {
  return (obj == undefined || obj == null);
}

function wS(sN, s) {
  try {
    FileStream.write(sP(sN), s);
    return true;
  } catch(e) {
    FLog(3, "Error on wS():" + ln + 
    "Error:" + ln + 
    e + ln + 
    "[line:" + e.lineNumber + "]" + ln + 
    "More info" + lw + ln + 
    "sN:" + ln + 
    sN + ln + 
    "s:" + ln + 
    s);
    return false;
  }
}

function rS(sN) {
  try {
    return FileStream.read(sP(sN)).split(ln);
  } catch(e) {
    return null;
  }
}

function sD(sN) {
  return "/sdcard/msgbot/Bots/" + sN + "/";
}

function sP(sN) {
  return "/sdcard/msgbot/Bots/" + sN + "/" + sN + ".js";
}

function FLog(logType, logStr) {
  var logTypeArray1 = ["⚗", "🟢", "🔵", "🔴", "🟡"];
  var logTypeArray2 = ["디버그", "알림", "정보", "오류", "경고"];
  if ((logType == null || logType == undefined) && (logStr == null || logStr == undefined)) {
    return "Log([로그 타입, 0에서 4까지의 숫자(0: 디버그, 1: 알림, 2: 정보, 3: 오류, 4: 경고)], [로그 내용])";
  } else if (!(logType <= 4 && logType >= 0)) {
    logType = 0;
    FLog(4, "FLog(" + logType + ", " + logStr + "): 로그 타입이 잘못되었습니다.");
  }
  logStr = logTypeArray1[logType] + "[" + date() + "][" + logTypeArray2[logType] + "] " + logStr;
  if (logType == 0) {
    Log.d(logStr);
  } else if (logType == 1) {
    Log.i(logStr);
  } else if (logType == 2) {
    Log.i(logStr);
  } else if (logType == 3) {
    Log.e(logStr);
  } else if (logType == 4) {
    Log.e(logStr);
  }
}

function getSrc(lnk) {
  var g = org.jsoup.Jsoup.connect(lnk).get();
  g.outputSettings().prettyPrint(false);
  return String(g.body()).replace(/^<body>/gm, '').replace(/<\/body>$/gm, '');
}

function date() {
  var dt = new Date();
  var days = "일월화수목금토";
  var year = dt.getFullYear();
  var month = dt.getMonth() + 1;
  var day = dt.getDate();
  var hour = dt.getHours();
  var minute = dt.getMinutes();
  var second = dt.getSeconds();
  return year + "-" + 
  ((month <= 10) ? "0" : "") + month + "-" + 
  ((day <= 10) ? "0" : "") + day + 
  "(" + days[dt.getDay()] + ") " + 
  ((hour <= 10) ? "0" : "") + hour + ":" + 
  ((minute <= 10) ? "0" : "") + minute + ":" + 
  ((second <= 10) ? "0" : "") + second;
}

function strToNum(str) {
  var out = -1;
  out = +str;
  if (Number.isNaN(out)) {
    out = -1;
  }
  return out;
}

function strToNum2(str) {
  var out = -1;
  out = +str;
  if (Number.isNaN(out)) {
    out = -1;
  } else if (Math.round(out) != out) {
    out = -1;
  }
  return out;
}

function isInt(int) {
  var out = false;
  var n = Number(int);
  out = !(Number.isNaN(n));
  return out;
}

function crSrc(name, apiLev, scriptPower, useUnifiedParams) {
  if (apiLev == 1 || apiLev == 2) {
    if (!name.includes(/[^0-9a-zA-Z ㄱ-ㅎㅏ-ㅣ가-힣]]/)) { //김유래님 감사합니다(/[^0-9a-zA-Z ㄱ-ㅎㅏ-ㅣ가-힣]]/)!
      const dS1 = "const scriptName = \"" + name + "\";" + ln + 
      "/**" + ln + 
      " * (string) room" + ln + 
      " * (string) sender" + ln + 
      " * (boolean) isGroupChat" + ln + 
      " * (void) replier.reply(message)" + ln + 
      " * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환" + ln + 
      " * (string) imageDB.getProfileBase64()" + ln + 
      " * (string) packageName" + ln + 
      " */" + ln + 
      "function response(" + (useUnifiedParams? "params" : "room, msg, sender, isGroupChat, replier, imageDB, packageName") + ") {" + ln + 
      "  " + ln + 
      "}" + ln + 
      ln + 
      "//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다." + ln + 
      "function onCreate(savedInstanceState, activity) {" + ln + 
      "  var textView = new android.widget.TextView(activity);" + ln + 
      "  textView.setText(\"Hello, World!\");" + ln + 
      "  textView.setTextColor(android.graphics.Color.DKGRAY);" + ln + 
      "  activity.setContentView(textView);" + ln + 
      "}" + ln + 
      ln + 
      "function onStart(activity) {}" + ln + 
      ln + 
      "function onResume(activity) {}" + ln + 
      ln + 
      "function onPause(activity) {}" + ln + 
      ln + 
      "function onStop(activity) {}"; //레거시 API
      const dS2 = "const bot = BotManager.getCurrentBot();" + ln +
      ln + 
      "/**" + ln +
      " * (string) msg.content: 메시지의 내용" + ln +
      " * (string) msg.room: 메시지를 받은 방 이름" + ln +
      " * (User) msg.author: 메시지 전송자" + ln +
      " * (string) msg.author.name: 메시지 전송자 이름" + ln +
      " * (Image) msg.author.avatar: 메시지 전송자 프로필 사진" + ln +
      " * (string) msg.author.avatar.getBase64()" + ln +
      " * (boolean) msg.isGroupChat: 단체/오픈채팅 여부" + ln +
      " * (boolean) msg.isDebugRoom: 디버그룸에서 받은 메시지일 시 true" + ln +
      " * (string) msg.packageName: 메시지를 받은 메신저의 패키지명" + ln +
      " * (void) msg.reply(string): 답장하기" + ln +
      " */" + ln +
      "function onMessage(msg) {}" + ln +
      "bot.addListener(Event.MESSAGE, onMessage);" + ln +
      ln +
      "/**" + ln +
      " * (string) msg.content: 메시지의 내용" + ln +
      " * (string) msg.room: 메시지를 받은 방 이름" + ln +
      " * (User) msg.author: 메시지 전송자" + ln +
      " * (string) msg.author.name: 메시지 전송자 이름" + ln +
      " * (Image) msg.author.avatar: 메시지 전송자 프로필 사진" + ln +
      " * (string) msg.author.avatar.getBase64()" + ln +
      " * (boolean) msg.isDebugRoom: 디버그룸에서 받은 메시지일 시 true" + ln +
      " * (boolean) msg.isGroupChat: 단체/오픈채팅 여부" + ln +
      " * (string) msg.packageName: 메시지를 받은 메신저의 패키지명" + ln +
      " * (void) msg.reply(string): 답장하기" + ln +
      " * (string) msg.command: 명령어 이름" + ln +
      " * (Array) msg.args: 명령어 인자 배열" + ln +
      " */" + ln +
      "function onCommand(msg) {}" + ln +
      "bot.setCommandPrefix(\"@\"); //@로 시작하는 메시지를 command로 판단" + ln +
      "bot.addListener(Event.COMMAND, onCommand); " + ln +
      ln +
      "function onCreate(savedInstanceState, activity) {" + ln +
      "  var textView = new android.widget.TextView(activity);" + ln +
      "  textView.setText(\"Hello, World!\");" + ln +
      "  textView.setTextColor(android.graphics.Color.DKGRAY);" + ln +
      "  activity.setContentView(textView);" + ln +
      "}" + ln +
      ln +
      "function onStart(activity) {}" + ln +
      ln +
      "function onResume(activity) {}" + ln +
      ln +
      "function onPause(activity) {}" + ln +
      ln +
      "function onStop(activity) {}" + ln +
      ln +
      "function onRestart(activity) {}" + ln +
      ln +
      "function onDestroy(activity) {}" + ln +
      ln + 
      "function onBackPressed(activity) {}" + ln +
      ln + 
      "bot.addListener(Event.Activity.CREATE, onCreate);" + ln +
      "bot.addListener(Event.Activity.START, onStart);" + ln +
      "bot.addListener(Event.Activity.RESUME, onResume);" + ln +
      "bot.addListener(Event.Activity.PAUSE, onPause);" + ln +
      "bot.addListener(Event.Activity.STOP, onStop);" + ln +
      "bot.addListener(Event.Activity.RESTART, onRestart);" + ln +
      "bot.addListener(Event.Activity.DESTROY, onDestroy);" + ln +
      "bot.addListener(Event.Activity.BACK_PRESSED, onBackPressed);"; //API2
      var f1 = ((apiLev == 1)? dS1 : dS2);
      var f2 = {"main": name + ".js", "option": {"apiLevel": apiLev, "useUnifiedParams": Boolean(useUnifiedParams), "useBabel": false, "scriptPower": Boolean(scriptPower)}};
      FileStream.write(sD(name) + "bot.json", JSON.stringify(f2, 0, 1));
      FileStream.write(sP(name), f1);
    } else {
      throw new Error("scriptName");
    }
  } else {
    throw new Error("apiLev");
  }
}


//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
function onCreate(savedInstanceState, activity) {
  var textView = new android.widget.TextView(activity);
  textView.setText("Hello, World!");
  textView.setTextColor(android.graphics.Color.DKGRAY);
  activity.setContentView(textView);
}

function onStart(activity) {}

function onResume(activity) {}

function onPause(activity) {}

function onStop(activity) {}