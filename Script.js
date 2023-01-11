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
  return ueHTML((g.body() + '').replace(/^<body>/gm, '').replace(/<\/body>$/gm, ''));
}

function ueHTML(src) {
  //http://kor.pe.kr/util/4/charmap2.htm
  //https://mateam.net/html-escape-characters/
  var esc = [];
  var cM = {
    "&#9;": "	", //Tab
    "&tab;": "	", //Tab
    "&10;": ln, //New Line
    "&newline;": ln, //New Line
    "&#32;": " ", //Space
    "&nbsp;": " ", //Space
    "&#33;": "!", //Exclamation mark
    "&#34;": "\"", //Quotation mark
    "&quot;": "\"", //Quotation mark
    "&#35;": "#", //Number sign
    "&#36;": "$", //Dollar sign
    "&#37;": "%", //Percent sign
    "&#38;": "&", //Ampersand
    "&amp;": "&", //Ampersand
    "&#39;": "`", //Aspotrophe
    "&#40;": "(", //Opening/Left Parenthesis
    "&#41;": ")", //Closing/Right Parenthesis
    "&#42;": "*", //Asterisk
    "&#43;": "+", //Plus sign
    "&#44;": ",", //Comma
    "&#45;": "-", //Hyphen
    "&#46;": ".", //Period
    "&#47;": "/", //Slash
    "&#48;": "0", //Digit 0
    "&#49;": "1", //Digit 1
    "&#50;": "2", //Digit 2
    "&#51;": "3", //Digit 3
    "&#52;": "4", //Digit 4
    "&#53;": "5", //Digit 5
    "&#54;": "6", //Digit 6
    "&#55;": "7", //Digit 7
    "&#56;": "8", //Digit 8
    "&#57;": "9", //Digit 9
    "&#58;": ":", //Colon
    "&#59;": ";", //Semicolon
    "&#60;": "<", //Less-than
    "&lt;": "&", //Less-than
    "&#61;": "=", //Equals sign
    "&#62;": ">", //Greater than
    "&gt;": ">", //Greatr than
    "&#63;": "?", //Question mark
    "&#64;": "@", //At sign
    "&#65;": "A", //Uppercase A
    "&#66;": "B", //Uppercase B
    "&#67;": "C", //Uppercase C
    "&#68;": "D", //Uppercase D
    "&#69;": "E", //Uppercase E
    "&#70;": "F", //Uppercase F
    "&#71;": "G", //Uppercase G
    "&#72;": "H", //Uppercase H
    "&#73;": "I", //Uppercase I
    "&#74;": "J", //Uppercase J
    "&#75;": "K", //Uppercase K
    "&#76;": "L", //Uppercase L
    "&#77;": "M", //Uppercase M
    "&#78;": "N", //Uppercase N
    "&#79;": "O", //Uppercase O
    "&#80;": "P", //Uppercase P
    "&#81;": "Q", //Uppercase Q
    "&#82;": "R", //Uppercase R
    "&#83;": "S", //Uppercase S
    "&#84;": "T", //Uppercase T
    "&#85;": "U", //Uppercase U
    "&#86;": "V", //Uppercase V
    "&#87;": "W", //Uppercase W
    "&#88;": "X", //Uppercase X
    "&#89;": "Y", //Uppercase Y
    "&#90;": "Z", //Uppercase Z
    "&#91;": "[", //Opening/Left square bracket
    "&#92;": "", //Backslash
    "&#93;": "]", //Closing/Right square bracket
    "&#94;": "^", //Caret
    "&#95;": "_", //Underscore
    "&#96;": "`", //Grave accent
    "&#97;": "a", //Lowercase a
    "&#98;": "b", //Lowercase b
    "&#99;": "c", //Lowercase c
    "&#100;": "d", //Lowercase d
    "&#101;": "e", //Lowercase e
    "&#102;": "f", //Lowercase f
    "&#103;": "g", //Lowercase g
    "&#104;": "h", //Lowercase h
    "&#105;": "i", //Lowercase i
    "&#106;": "j", //Lowercase j
    "&#107;": "k", //Lowercase k
    "&#108;": "l", //Lowercase l
    "&#109;": "m", //Lowercase m
    "&#110;": "n", //Lowercase n
    "&#111;": "o", //Lowercase o
    "&#112;": "p", //Lowercase p
    "&#113;": "q", //Lowercase q
    "&#114;": "r", //Lowercase r
    "&#115;": "s", //Lowercase s
    "&#116;": "t", //Lowercase t
    "&#117;": "u", //Lowercase u
    "&#118;": "v", //Lowercase v
    "&#119;": "w", //Lowercase w
    "&#120;": "x", //Lowercase x
    "&#121;": "y", //Lowercase y
    "&#122;": "z", //Lowercase z
    "&#123;": "{", //Opening/Left curly brace
    "&#124;": "|", //Vertical bar
    "&#125;": "}", //Closing/Right curly brace
    "&#126;": "~", //Tilde
    "&#128;": "€", //Euro sign
    "&#130;": "‚", //Punctuation mark
    "&#131;": "ƒ", //Florin sign
    "&#132;": "„", //Quotation mark
    "&#133;": "…", //Horizontal ellipsis
    "&#134;": "†", //Dagger
    "&#135;": "‡", //Double dagger
    "&#136;": "ˆ", //Circumflex
    "&#137;": "‰", //Per-mille
    "&#138;": "Š", //Latin capital letter s with caron
    "&#139;": "‹", //Single left angle quotation
    "&#140;": "Œ", //Uppercase ligature OE
    "&#142;": "Ž", //Latin capital letter z with caron
    "&#145;": "‘", //Opening single quotation mark
    "&#146;": "’", //Closing single quotation mark
    "&#147;": "“", //Opening double quotation mark
    "&#148;": "”", //Closing double quotation mark
    "&#149;": "•", //Bullet
    "&#150;": "–", //En dash
    "&#151;": "—", //Em dash
    "&#152;": "˜", //Tilde
    "&#153;": "™", //Trademark
    "&#154;": "š", //Latin small letter s with caron
    "&#155;": "›", //Single right angle quotation
    "&#156;": "œ", //Lowercase ligature OE
    "&#158;": "ž", //Latin small letter z with caron
    "&#159;": "Ÿ", //Latin capital letter y with diaeresis
    "&#160;": "Non-breaking space", //Non-breaking space
    "&nbsp;": "Non-breaking space", //Non-breaking space
    "&#161;": "¡", //Inverted exclamation mark
    "&iexcl;": "¡", //Inverted exclamation mark
    "&#162;": "¢", //Cent
    "&cent;": "¢", //Cent
    "&#163;": "£", //Pound
    "&pound;": "£", //Pound
    "&#164;": "¤", //Currency
    "&curren;": "¤", //Currency
    "&#165;": "¥", //Yen
    "&yen;": "¥", //Yen
    "&#166;": "¦", //Broken vertical bar
    "&brvbar;": "¦", //Broken vertical bar
    "&#167;": "§", //Section
    "&sect;": "§", //Section
    "&#168;": "¨", //Spacing diaeresis
    "&uml;": "¨", //Spacing diaeresis
    "&#169;": "©", //Copyright
    "&copy;": "©", //Copyright
    "&#170;": "ª", //Feminine ordinal indicator
    "&ordf;": "ª", //Feminine ordinal indicator
    "&#171;": "«", //Opening/Left angle quotation mark
    "&laquo;": "«", //Opening/Left angle quotation mark
    "&#172;": "¬", //Negation
    "&not;": "¬", //Negation
    "&#173;": "¬Soft hyphen", //Soft hyphen
    "&shy;": "¬Soft hyphen", //Soft hyphen
    "&#174;": "®", //Registered trademark
    "&reg;": "®", //Registered trademark
    "&#175;": "¯", //Spacing macron
    "&macr;": "¯", //Spacing macron
    "&#176;": "°", //Degree
    "&deg;": "°", //Degree
    "&#177;": "±", //Plus or minus
    "&plusmn;": "±", //Plus or minus
    "&#178;": "²", //Superscript 2
    "&sup2;": "²", //Superscript 2
    "&#179;": "³", //Superscript 3
    "&sup3;": "³", //Superscript 3
    "&#180;": "´", //Spacing acute
    "&acute;": "´", //Spacing acute
    "&#181;": "µ", //Micro
    "&micro;": "µ", //Micro
    "&#182;": "¶", //Paragraph
    "&para;": "¶", //Paragraph
    "&#183;": "·", //Dot
    "&dot;": "·", //Dot
    "&#184;": "¸", //Spacing cedilla
    "&cedil;": "¸", //Spacing cedilla
    "&#185;": "¹", //Superscript 1
    "&sup1;": "¹", //Superscript 1
    "&#186;": "º", //Masculine ordinal indicator
    "&ordm;": "º", //Masculine ordinal indicator
    "&#187;": "»", //Closing/Right angle quotation mark
    "&raquo;": "»", //Closing/Right angle quotation mark
    "&#188;": "¼", //Fraction 1/4
    "&frac14;": "¼", //Fraction 1/4
    "&#189;": "½", //Fraction 1/2
    "&frac12;": "½", //Fraction 1/2
    "&#190;": "¾", //Fraction 3/4
    "&frac34;": "¾", //Fraction 3/4
    "&#191;": "¿", //Inverted question mark
    "&iquest;": "¿", //Inverted question mark
    "&#192;": "À", //Capital a with grave accent
    "&Agrave;": "À", //Capital a with grave accent
    "&#193;": "Á", //Capital a with acute accent
    "&Aacute;": "Á", //Capital a with acute accent
    "&#194;": "Â", //Capital a with circumflex accent
    "&Acirc;": "Â", //Capital a with circumflex accent
    "&#195;": "Ã", //Capital a with tilde
    "&Atilde;": "Ã", //Capital a with tilde
    "&#196;": "Ä", //Capital a with umlaut
    "&Auml;": "Ä", //Capital a with umlaut
    "&#197;": "Å", //Capital a with ring
    "&Aring;": "Å", //Capital a with ring
    "&#198;": "Æ", //Capital ae
    "&AElig;": "Æ", //Capital ae
    "&#199;": "Ç", //Capital c with cedilla
    "&Ccedil;": "Ç", //Capital c with cedilla
    "&#200;": "È", //Capital e with grave accent
    "&Egrave;": "È", //Capital e with grave accent
    "&#201;": "É", //Capital e with acute accent
    "&Eacute;": "É", //Capital e with acute accent
    "&#202;": "Ê", //Capital e with circumflex accent
    "&Ecirc;": "Ê", //Capital e with circumflex accent
    "&#203;": "Ë", //Capital e with umlaut
    "&Euml;": "Ë", //Capital e with umlaut
    "&#204;": "Ì", //Capital i with grave accent
    "&Igrave;": "Ì", //Capital i with grave accent
    "&#205;": "Í", //Capital i with accute accent
    "&Iacute;": "Í", //Capital i with accute accent
    "&#206;": "Î", //Capital i with circumflex accent
    "&Icirc;": "Î", //Capital i with circumflex accent
    "&#207;": "Ï", //Capital i with umlaut
    "&Iuml;": "Ï", //Capital i with umlaut
    "&#208;": "Ð", //Capital eth (Icelandic)
    "&ETH;": "Ð", //Capital eth (Icelandic)
    "&#209;": "Ñ", //Capital n with tilde
    "&Ntilde;": "Ñ", //Capital n with tilde
    "&#210;": "Ò", //Capital o with grave accent
    "&Ograve;": "Ò", //Capital o with grave accent
    "&#211;": "Ó", //Capital o with accute accent
    "&Oacute;": "Ó", //Capital o with accute accent
    "&#212;": "Ô", //Capital o with circumflex accent
    "&Ocirc;": "Ô", //Capital o with circumflex accent
    "&#213;": "Õ", //Capital o with tilde
    "&Otilde;": "Õ", //Capital o with tilde
    "&#214;": "Ö", //Capital o with umlaut
    "&Ouml;": "Ö", //Capital o with umlaut
    "&#215;": "×", //Multiplication
    "&times;": "×", //Multiplication
    "&#216;": "Ø", //Capital o with slash
    "&Oslash;": "Ø", //Capital o with slash
    "&#217;": "Ù", //Capital u with grave accent
    "&Ugrave;": "Ù", //Capital u with grave accent
    "&#218;": "Ú", //Capital u with acute accent
    "&Uacute;": "Ú", //Capital u with acute accent
    "&#219;": "Û", //Capital u with circumflex accent
    "&Ucirc;": "Û", //Capital u with circumflex accent
    "&#220;": "Ü", //Capital u with umlaut
    "&Uuml;": "Ü", //Capital u with umlaut
    "&#221;": "Ý", //Capital y with acute accent
    "&Yacute;": "Ý", //Capital y with acute accent
    "&#222;": "Þ", //Capital thorn (Icelandic)
    "&THORN;": "Þ", //Capital thorn (Icelandic)
    "&#223;": "ß", //Lowercase sharp s (German)
    "&szlig;": "ß", //Lowercase sharp s (German)
    "&#224;": "à", //Lowercase a with grave accent
    "&agrave;": "à", //Lowercase a with grave accent
    "&#225;": "á", //Lowercase a with acute accent
    "&aacute;": "á", //Lowercase a with acute accent
    "&#226;": "â", //Lowercase a with circumflex accent
    "&acirc;": "â", //Lowercase a with circumflex accent
    "&#227;": "ã", //Lowercase a with tilde
    "&atilde;": "ã", //Lowercase a with tilde
    "&#228;": "ä", //Lowercase a with umlaut
    "&auml;": "ä", //Lowercase a with umlaut
    "&#229;": "å", //Lowercase a with ring
    "&aring;": "å", //Lowercase a with ring
    "&#230;": "æ", //Lowercase ae
    "&aelig;": "æ", //Lowercase ae
    "&#231;": "ç", //Lowercase c with cedilla
    "&ccedil;": "ç", //Lowercase c with cedilla
    "&#232;": "è", //Lowercase e with grave accent
    "&egrave;": "è", //Lowercase e with grave accent
    "&#233;": "é", //Lowercase e with acute accent
    "&eacute;": "é", //Lowercase e with acute accent
    "&#234;": "ê", //Lowercase e with circumflex accent
    "&ecirc;": "ê", //Lowercase e with circumflex accent
    "&#235;": "ë", //Lowercase e with umlaut
    "&euml;": "ë", //Lowercase e with umlaut
    "&#236;": "ì", //Lowercase i with grave accent
    "&igrave;": "ì", //Lowercase i with grave accent
    "&#237;": "í", //Lowercase i with acute accent
    "&iacute;": "í", //Lowercase i with acute accent
    "&#238;": "î", //Lowercase i with circumflex accent
    "&icirc;": "î", //Lowercase i with circumflex accent
    "&#239;": "ï", //Lowercase i with umlaut
    "&iuml;": "ï", //Lowercase i with umlaut
    "&#240;": "ð", //Lowercase eth (Icelandic)
    "&eth;": "ð", //Lowercase eth (Icelandic)
    "&#241;": "ñ", //Lowercase n with tilde
    "&ntilde;": "ñ", //Lowercase n with tilde
    "&#242;": "ò", //Lowercase o with grave accent
    "&ograve;": "ò", //Lowercase o with grave accent
    "&#243;": "ó", //Lowercase o with acute accent
    "&oacute;": "ó", //Lowercase o with acute accent
    "&#244;": "ô", //Lowercase o with circumflex accent
    "&ocirc;": "ô", //Lowercase o with circumflex accent
    "&#245;": "õ", //Lowercase o with tilde
    "&otilde;": "õ", //Lowercase o with tilde
    "&#246;": "ö", //Lowercase o with umlaut
    "&ouml;": "ö", //Lowercase o with umlaut
    "&#247;": "÷", //Divide
    "&divide;": "÷", //Divide
    "&#248;": "ø", //Lowercase o with slash
    "&oslash;": "ø", //Lowercase o with slash
    "&#249;": "ù", //Lowercase u with grave accent
    "&ugrave;": "ù", //Lowercase u with grave accent
    "&#250;": "ú", //Lowercase u with acute accent
    "&uacute;": "ú", //Lowercase u with acute accent
    "&#251;": "û", //Lowercase u with circumflex accent
    "&ucirc;": "û", //Lowercase u with circumflex accent
    "&#252;": "ü", //Lowercase u with umlaut
    "&uuml;": "ü", //Lowercase u with umlaut
    "&#253;": "ý", //Lowercase y with acute accent
    "&yacute;": "ý", //Lowercase y with acute accent
    "&#254;": "þ", //Lowercase thorn (Icelandic)
    "&thorn;": "þ", //Lowercase thorn (Icelandic)
    "&#255;": "ÿ", //Lowercase y with umlaut
    "&yuml;": "ÿ", //Lowercase y with umlaut
    "&#256;": "Ā", //Latin capital letter a with macron
    "&Amacr;": "Ā", //Latin capital letter a with macron
    "&#257;": "ā", //Latin small letter a with macron
    "&amacr;": "ā", //Latin small letter a with macron
    "&#258;": "Ă", //Latin capital letter a with breve
    "&Abreve;": "Ă", //Latin capital letter a with breve
    "&#259;": "ă", //Latin small letter a with breve
    "&abreve;": "ă", //Latin small letter a with breve
    "&#260;": "Ą", //Latin capital letter a with ogonek
    "&Aogon;": "Ą", //Latin capital letter a with ogonek
    "&#261;": "ą", //Latin small letter a with ogonek
    "&aogon;": "ą", //Latin small letter a with ogonek
    "&#262;": "Ć", //Latin capital letter c with acute
    "&Cacute;": "Ć", //Latin capital letter c with acute
    "&#263;": "ć", //Latin small letter c with acute
    "&cacute;": "ć", //Latin small letter c with acute
    "&#264;": "Ĉ", //Latin capital letter c with circumflex
    "&Ccirc;": "Ĉ", //Latin capital letter c with circumflex
    "&#265;": "ĉ", //Latin small letter c with circumflex
    "&ccirc;": "ĉ", //Latin small letter c with circumflex
    "&#266;": "Ċ", //Latin capital letter c with dot above
    "&Cdot;": "Ċ", //Latin capital letter c with dot above
    "&#267;": "ċ", //Latin small letter c with dot above
    "&cdot;": "ċ", //Latin small letter c with dot above
    "&#268;": "Č", //Latin capital letter c with caron
    "&Ccaron;": "Č", //Latin capital letter c with caron
    "&#269;": "č", //Latin small letter c with caron
    "&ccaron;": "č", //Latin small letter c with caron
    "&#270;": "Ď", //Latin capital letter d with caron
    "&Dcaron;": "Ď", //Latin capital letter d with caron
    "&#271;": "ď", //Latin small letter d with caron
    "&dcaron;": "ď", //Latin small letter d with caron
    "&#272;": "Đ", //Latin capital letter d with stroke
    "&Dstrok;": "Đ", //Latin capital letter d with stroke
    "&#273;": "đ", //Latin small letter d with stroke
    "&dstrok;": "đ", //Latin small letter d with stroke
    "&#274;": "Ē", //Latin capital letter e with macron
    "&Emacr;": "Ē", //Latin capital letter e with macron
    "&#275;": "ē", //Latin small letter e with macron
    "&emacr;": "ē", //Latin small letter e with macron
    "&#276;": "Ĕ", //Latin capital letter e with breve
    "&Ebreve;": "Ĕ", //Latin capital letter e with breve
    "&#277;": "ĕ", //Latin small letter e with breve
    "&ebreve;": "ĕ", //Latin small letter e with breve
    "&#278;": "Ė", //Latin capital letter e with dot above
    "&Edot;": "Ė", //Latin capital letter e with dot above
    "&#279;": "ė", //Latin small letter e with dot above
    "&edot;": "ė", //Latin small letter e with dot above
    "&#280;": "Ę", //Latin capital letter e with ogonek
    "&Eogon;": "Ę", //Latin capital letter e with ogonek
    "&#281;": "ę", //Latin small letter e with ogonek
    "&eogon;": "ę", //Latin small letter e with ogonek
    "&#282;": "Ě", //Latin capital letter e with caron
    "&Ecaron;": "Ě", //Latin capital letter e with caron
    "&#283;": "ě", //Latin small letter e with caron
    "&ecaron;": "ě", //Latin small letter e with caron
    "&#284;": "Ĝ", //Latin capital letter g with circumflex
    "&Gcirc;": "Ĝ", //Latin capital letter g with circumflex
    "&#285;": "ĝ", //Latin small letter g with circumflex
    "&gcirc;": "ĝ", //Latin small letter g with circumflex
    "&#286;": "Ğ", //Latin capital letter g with breve
    "&Gbreve;": "Ğ", //Latin capital letter g with breve
    "&#287;": "ğ", //Latin small letter g with breve
    "&gbreve;": "ğ", //Latin small letter g with breve
    "&#288;": "Ġ", //Latin capital letter g with dot above
    "&Gdot;": "Ġ", //Latin capital letter g with dot above
    "&#289;": "ġ", //Latin small letter g with dot above
    "&gdot;": "ġ", //Latin small letter g with dot above
    "&#290;": "Ģ", //Latin capital letter g with cedilla
    "&Gcedil;": "Ģ", //Latin capital letter g with cedilla
    "&#291;": "ģ", //Latin small letter g with cedilla
    "&gcedil;": "ģ", //Latin small letter g with cedilla
    "&#292;": "Ĥ", //Latin capital letter h with circumflex
    "&Hcirc;": "Ĥ", //Latin capital letter h with circumflex
    "&#293;": "ĥ", //Latin small letter h with circumflex
    "&hcirc;": "ĥ", //Latin small letter h with circumflex
    "&#294;": "Ħ", //Latin capital letter h with stroke
    "&Hstrok;": "Ħ", //Latin capital letter h with stroke
    "&#295;": "ħ", //Latin small letter h with stroke
    "&hstrok;": "ħ", //Latin small letter h with stroke
    "&#296;": "Ĩ", //Latin capital letter I with tilde
    "&Itilde;": "Ĩ", //Latin capital letter I with tilde
    "&#297;": "ĩ", //Latin small letter I with tilde
    "&itilde;": "ĩ", //Latin small letter I with tilde
    "&#298;": "Ī", //Latin capital letter I with macron
    "&Imacr;": "Ī", //Latin capital letter I with macron
    "&#299;": "ī", //Latin small letter I with macron
    "&imacr;": "ī", //Latin small letter I with macron
    "&#300;": "Ĭ", //Latin capital letter I with breve
    "&Ibreve;": "Ĭ", //Latin capital letter I with breve
    "&#301;": "ĭ", //Latin small letter I with breve
    "&ibreve;": "ĭ", //Latin small letter I with breve
    "&#302;": "Į", //Latin capital letter I with ogonek
    "&Iogon;": "Į", //Latin capital letter I with ogonek
    "&#303;": "į", //Latin small letter I with ogonek
    "&iogon;": "į", //Latin small letter I with ogonek
    "&#304;": "İ", //Latin capital letter I with dot above
    "&Idot;": "İ", //Latin capital letter I with dot above
    "&inodot;": "ı", //&#305; Latin small letter dotless I
    "&imath;": "ı", //&#305; Latin small letter dotless I
    "&#306;": "Ĳ", //Latin capital ligature ij
    "&IJlig;": "Ĳ", //Latin capital ligature ij
    "&#307;": "ĳ", //Latin small ligature ij
    "&ijlig;": "ĳ", //Latin small ligature ij
    "&#308;": "Ĵ", //Latin capital letter j with circumflex
    "&Jcirc;": "Ĵ", //Latin capital letter j with circumflex
    "&#309;": "ĵ", //Latin small letter j with circumflex
    "&jcirc;": "ĵ", //Latin small letter j with circumflex
    "&#310;": "Ķ", //Latin capital letter k with cedilla
    "&Kcedil;": "Ķ", //Latin capital letter k with cedilla
    "&#311;": "ķ", //Latin small letter k with cedilla
    "&kcedil;": "ķ", //Latin small letter k with cedilla
    "&#312;": "ĸ", //Latin small letter kra
    "&kgreen;": "ĸ", //Latin small letter kra
    "&#313;": "Ĺ", //Latin capital letter l with acute
    "&Lacute;": "Ĺ", //Latin capital letter l with acute
    "&#314;": "ĺ", //Latin small letter l with acute
    "&lacute;": "ĺ", //Latin small letter l with acute
    "&#315;": "Ļ", //Latin capital letter l with cedilla
    "&Lcedil;": "Ļ", //Latin capital letter l with cedilla
    "&#316;": "ļ", //Latin small letter l with cedilla
    "&lcedil;": "ļ", //Latin small letter l with cedilla
    "&#317;": "Ľ", //Latin capital letter l with caron
    "&Lcaron;": "Ľ", //Latin capital letter l with caron
    "&#318;": "ľ", //Latin small letter l with caron
    "&lcaron;": "ľ", //Latin small letter l with caron
    "&#319;": "Ŀ", //Latin capital letter l with middle dot
    "&Lmidot;": "Ŀ", //Latin capital letter l with middle dot
    "&#320;": "ŀ", //Latin small letter l with middle dot
    "&lmidot;": "ŀ", //Latin small letter l with middle dot
    "&#321;": "Ł", //Latin capital letter l with stroke
    "&Lstrok;": "Ł", //Latin capital letter l with stroke
    "&#322;": "ł", //Latin small letter l with stroke
    "&lstrok;": "ł", //Latin small letter l with stroke
    "&#323;": "Ń", //Latin capital letter n with acute
    "&Nacute;": "Ń", //Latin capital letter n with acute
    "&#324;": "ń", //Latin small letter n with acute
    "&nacute;": "ń", //Latin small letter n with acute
    "&#325;": "Ņ", //Latin capital letter n with cedilla
    "&Ncedil;": "Ņ", //Latin capital letter n with cedilla
    "&#326;": "ņ", //Latin small letter n with cedilla
    "&ncedil;": "ņ", //Latin small letter n with cedilla
    "&#327;": "Ň", //Latin capital letter n with caron
    "&Ncaron;": "Ň", //Latin capital letter n with caron
    "&#328;": "ň", //Latin small letter n with caron
    "&ncaron;": "ň", //Latin small letter n with caron
    "&#329;": "ŉ", //Latin small letter n preceded by apostrophe
    "&napos;": "ŉ", //Latin small letter n preceded by apostrophe
    "&#330;": "Ŋ", //Latin capital letter eng
    "&ENG;": "Ŋ", //Latin capital letter eng
    "&#331;": "ŋ", //Latin small letter eng
    "&eng;": "ŋ", //Latin small letter eng
    "&#332;": "Ō", //Latin capital letter o with macron
    "&Omacr;": "Ō", //Latin capital letter o with macron
    "&#333;": "ō", //Latin small letter o with macron
    "&omacr;": "ō", //Latin small letter o with macron
    "&#334;": "Ŏ", //Latin capital letter o with breve
    "&Obreve;": "Ŏ", //Latin capital letter o with breve
    "&#335;": "ŏ", //Latin small letter o with breve
    "&obreve;": "ŏ", //Latin small letter o with breve
    "&#336;": "Ő", //Latin capital letter o with double acute
    "&Odblac;": "Ő", //Latin capital letter o with double acute
    "&#337;": "ő", //Latin small letter o with double acute
    "&odblac;": "ő", //Latin small letter o with double acute
    "&#338;": "Œ", //Uppercase ligature OE
    "&OElig;": "Œ", //Uppercase ligature OE
    "&#339;": "œ", //Lowercase ligature OE
    "&oelig;": "œ", //Lowercase ligature OE
    "&#340;": "Ŕ", //Latin capital letter r with acute
    "&Racute;": "Ŕ", //Latin capital letter r with acute
    "&#341;": "ŕ", //Latin small letter r with acute
    "&racute;": "ŕ", //Latin small letter r with acute
    "&#342;": "Ŗ", //Latin capital letter r with cedilla
    "&Rcedil;": "Ŗ", //Latin capital letter r with cedilla
    "&#343;": "ŗ", //Latin small letter r with cedilla
    "&rcedil;": "ŗ", //Latin small letter r with cedilla
    "&#344;": "Ř", //Latin capital letter r with caron
    "&Rcaron;": "Ř", //Latin capital letter r with caron
    "&#345;": "ř", //Latin small letter r with caron
    "&rcaron;": "ř", //Latin small letter r with caron
    "&#346;": "Ś", //Latin capital letter s with acute
    "&Sacute;": "Ś", //Latin capital letter s with acute
    "&#347;": "ś", //Latin small letter s with acute
    "&sacute;": "ś", //Latin small letter s with acute
    "&#348;": "Ŝ", //Latin capital letter s with circumflex
    "&Scirc;": "Ŝ", //Latin capital letter s with circumflex
    "&#349;": "ŝ", //Latin small letter s with circumflex
    "&scirc;": "ŝ", //Latin small letter s with circumflex
    "&#350;": "Ş", //Latin capital letter s with cedilla
    "&Scedil;": "Ş", //Latin capital letter s with cedilla
    "&#351;": "ş", //Latin small letter s with cedilla
    "&scedil;": "ş", //Latin small letter s with cedilla
    "&#352;": "Š", //Uppercase S with caron
    "&Scaron;": "Š", //Uppercase S with caron
    "&#353;": "š", //Lowercase S with caron
    "&scaron;": "š", //Lowercase S with caron
    "&#354;": "Ţ", //Latin capital letter t with cedilla
    "&Tcedil;": "Ţ", //Latin capital letter t with cedilla
    "&#355;": "ţ", //Latin small letter t with cedilla
    "&tcedil;": "ţ", //Latin small letter t with cedilla
    "&#356;": "Ť", //Latin capital letter t with caron
    "&Tcaron;": "Ť", //Latin capital letter t with caron
    "&#357;": "ť", //Latin small letter t with caron
    "&tcaron;": "ť", //Latin small letter t with caron
    "&#358;": "Ŧ", //Latin capital letter t with stroke
    "&Tstrok;": "Ŧ", //Latin capital letter t with stroke
    "&#359;": "ŧ", //Latin small letter t with stroke
    "&tstrok;": "ŧ", //Latin small letter t with stroke
    "&#360;": "Ũ", //Latin capital letter u with tilde
    "&Utilde;": "Ũ", //Latin capital letter u with tilde
    "&#361;": "ũ", //Latin small letter u with tilde
    "&utilde;": "ũ", //Latin small letter u with tilde
    "&#362;": "Ū", //Latin capital letter u with macron
    "&Umacr;": "Ū", //Latin capital letter u with macron
    "&#363;": "ū", //Latin small letter u with macron
    "&umacr;": "ū", //Latin small letter u with macron
    "&#364;": "Ŭ", //Latin capital letter u with breve
    "&Ubreve;": "Ŭ", //Latin capital letter u with breve
    "&#365;": "ŭ", //Latin small letter u with breve
    "&ubreve;": "ŭ", //Latin small letter u with breve
    "&#366;": "Ů", //Latin capital letter u with ring above
    "&Uring;": "Ů", //Latin capital letter u with ring above
    "&#367;": "ů", //Latin small letter u with ring above
    "&uring;": "ů", //Latin small letter u with ring above
    "&#368;": "Ű", //Latin capital letter u with double acute
    "&Udblac;": "Ű", //Latin capital letter u with double acute
    "&#369;": "ű", //Latin small letter u with double acute
    "&udblac;": "ű", //Latin small letter u with double acute
    "&#370;": "Ų", //Latin capital letter u with ogonek
    "&Uogon;": "Ų", //Latin capital letter u with ogonek
    "&#371;": "ų", //Latin small letter u with ogonek
    "&uogon;": "ų", //Latin small letter u with ogonek
    "&#372;": "Ŵ", //Latin capital letter w with circumflex
    "&Wcirc;": "Ŵ", //Latin capital letter w with circumflex
    "&#373;": "ŵ", //Latin small letter w with circumflex
    "&wcirc;": "ŵ", //Latin small letter w with circumflex
    "&#374;": "Ŷ", //Latin capital letter y with circumflex
    "&Ycirc;": "Ŷ", //Latin capital letter y with circumflex
    "&#375;": "ŷ", //Latin small letter y with circumflex
    "&ycirc;": "ŷ", //Latin small letter y with circumflex
    "&#376;": "Ÿ", //Capital Y with diaeres
    "&Yuml;": "Ÿ", //Capital Y with diaeres
    "&#402;": "ƒ", //Lowercase with hook
    "&fnof;": "ƒ", //Lowercase with hook
    "&#710;": "ˆ", //Circumflex accent
    "&circ;": "ˆ", //Circumflex accent
    "&#732;": "˜", //Tilde
    "&tilde;": "˜", //Tilde
    "&#913;": "Α", //Alpha
    "&Alpha;": "Α", //Alpha
    "&#914;": "Β", //Beta
    "&Beta;": "Β", //Beta
    "&#915;": "Γ", //Gamma
    "&Gamma;": "Γ", //Gamma
    "&#916;": "Δ", //Delta
    "&Delta;": "Δ", //Delta
    "&#917;": "Ε", //Epsilon
    "&Epsilon;": "Ε", //Epsilon
    "&#918;": "Ζ", //Zeta
    "&Zeta;": "Ζ", //Zeta
    "&#919;": "Η", //Eta
    "&Eta;": "Η", //Eta
    "&#920;": "Θ", //Theta
    "&Theta;": "Θ", //Theta
    "&#921;": "Ι", //Iota
    "&Iota;": "Ι", //Iota
    "&#922;": "Κ", //Kappa
    "&Kappa;": "Κ", //Kappa
    "&#923;": "Λ", //Lambda
    "&Lambda;": "Λ", //Lambda
    "&#924;": "Μ", //Mu
    "&Mu;": "Μ", //Mu
    "&#925;": "Ν", //Nu
    "&Nu;": "Ν", //Nu
    "&#926;": "Ξ", //Xi
    "&Xi;": "Ξ", //Xi
    "&#927;": "Ο", //Omicron
    "&Omicron;": "Ο", //Omicron
    "&#928;": "Π", //Pi
    "&Pi;": "Π", //Pi
    "&#929;": "Ρ", //Rho
    "&Rho;": "Ρ", //Rho
    "&#931;": "Σ", //Sigma
    "&Sigma;": "Σ", //Sigma
    "&#932;": "Τ", //Tau
    "&Tau;": "Τ", //Tau
    "&#933;": "Υ", //Upsilon
    "&Upsilon;": "Υ", //Upsilon
    "&#934;": "Φ", //Phi
    "&Phi;": "Φ", //Phi
    "&#935;": "Χ", //Chi
    "&Chi;": "Χ", //Chi
    "&#936;": "Ψ", //Psi
    "&Psi;": "Ψ", //Psi
    "&#937;": "Ω", //Omega
    "&Omega;": "Ω", //Omega
    "&#945;": "α", //alpha
    "&alpha;": "α", //alpha
    "&#946;": "β", //beta
    "&beta;": "β", //beta
    "&#947;": "γ", //gamma
    "&gamma;": "γ", //gamma
    "&#948;": "δ", //delta
    "&delta;": "δ", //delta
    "&#949;": "ε", //epsilon
    "&epsilon;": "ε", //epsilon
    "&#950;": "ζ", //zeta
    "&zeta;": "ζ", //zeta
    "&#951;": "η", //eta
    "&eta;": "η", //eta
    "&#952;": "θ", //theta
    "&theta;": "θ", //theta
    "&#953;": "ι", //iota
    "&iota;": "ι", //iota
    "&#954;": "κ", //kappa
    "&kappa;": "κ", //kappa
    "&#955;": "λ", //lambda
    "&lambda;": "λ", //lambda
    "&#956;": "μ", //mu
    "&mu;": "μ", //mu
    "&#957;": "ν", //nu
    "&nu;": "ν", //nu
    "&#958;": "ξ", //xi
    "&xi;": "ξ", //xi
    "&#959;": "ο", //omicron
    "&omicron;": "ο", //omicron
    "&#960;": "π", //pi
    "&pi;": "π", //pi
    "&#961;": "ρ", //rho
    "&rho;": "ρ", //rho
    "&#962;": "ς", //sigmaf
    "&sigmaf;": "ς", //sigmaf
    "&#963;": "σ", //sigma
    "&sigma;": "σ", //sigma
    "&#964;": "τ", //tau
    "&tau;": "τ", //tau
    "&#965;": "υ", //upsilon
    "&upsilon;": "υ", //upsilon
    "&#966;": "φ", //phi
    "&phi;": "φ", //phi
    "&#967;": "χ", //chi
    "&chi;": "χ", //chi
    "&#968;": "ψ", //psi
    "&psi;": "ψ", //psi
    "&#969;": "ω", //omega
    "&omega;": "ω", //omega
    "&#977;": "ϑ", //Theta symbol
    "&thetasym;": "ϑ", //Theta symbol
    "&#978;": "ϒ", //Upsilon symbol
    "&upsih;": "ϒ", //Upsilon symbol
    "&#982;": "ϖ", //Pi symbol
    "&piv;": "ϖ", //Pi symbol
    "&#8194;": "En space", //En space
    "&ensp;": "En space", //En space
    "&#8195;": "Em space", //Em space
    "&emsp;": "Em space", //Em space
    "&#8201;": "Thin space", //Thin space
    "&thinsp;": "Thin space", //Thin space
    "&#8204;": "Zero width non-joiner", //Zero width non-joiner
    "&zwnj;": "Zero width non-joiner", //Zero width non-joiner
    "&#8205;": "Zero width joiner", //Zero width joiner
    "&zwj;": "Zero width joiner", //Zero width joiner
    "&#8206;": "Left-to-right mark", //Left-to-right mark
    "&lrm;": "Left-to-right mark", //Left-to-right mark
    "&#8207;": "Right-to-left mark", //Right-to-left mark
    "&rlm;": "Right-to-left mark", //Right-to-left mark
    "&#8211;": "–", //En dash
    "&ndash;": "–", //En dash
    "&#8212;": "—", //Em dash
    "&mdash;": "—", //Em dash
    "&#8216;": "‘", //Left single quotation mark
    "&lsquo;": "‘", //Left single quotation mark
    "&#8217;": "’", //Right single quotation mark
    "&rsquo;": "’", //Right single quotation mark
    "&#8218;": "‚", //Single low-9 quotation mark
    "&sbquo;": "‚", //Single low-9 quotation mark
    "&#8220;": "“", //Left double quotation mark
    "&ldquo;": "“", //Left double quotation mark
    "&#8221;": "”", //Right double quotation mark
    "&rdquo;": "”", //Right double quotation mark
    "&#8222;": "„", //Double low-9 quotation mark
    "&bdquo;": "„", //Double low-9 quotation mark
    "&#8224;": "†", //Dagger
    "&dagger;": "†", //Dagger
    "&#8225;": "‡", //Double dagger
    "&Dagger;": "‡", //Double dagger
    "&#8226;": "•", //Bullet
    "&bull;": "•", //Bullet
    "&#8230;": "…", //Horizontal ellipsis
    "&hellip;": "…", //Horizontal ellipsis
    "&#8240;": "‰", //Per mille
    "&permil;": "‰", //Per mille
    "&#8242;": "′", //Minutes (Degrees)
    "&prime;": "′", //Minutes (Degrees)
    "&#8243;": "″", //Seconds (Degrees)
    "&Prime;": "″", //Seconds (Degrees)
    "&#8249;": "‹", //Single left angle quotation
    "&lsaquo;": "‹", //Single left angle quotation
    "&#8250;": "›", //Single right angle quotation
    "&rsaquo;": "›", //Single right angle quotation
    "&#8254;": "‾", //Overline
    "&oline;": "‾", //Overline
    "&#8364;": "€", //Euro
    "&euro;": "€", //Euro
    "&#8482;": "™", //Trademark
    "&trade;": "™", //Trademark
    "&#8592;": "←", //Left arrow
    "&larr;": "←", //Left arrow
    "&#8593;": "↑", //Up arrow
    "&uarr;": "↑", //Up arrow
    "&#8594;": "→", //Right arrow
    "&rarr;": "→", //Right arrow
    "&#8595;": "↓", //Down arrow
    "&darr;": "↓", //Down arrow
    "&#8596;": "↔", //Left right arrow
    "&harr;": "↔", //Left right arrow
    "&#8629;": "↵", //Carriage return arrow
    "&crarr;": "↵", //Carriage return arrow
    "&#8704;": "∀", //For all
    "&forall;": "∀", //For all
    "&#8706;": "∂", //Part
    "&part;": "∂", //Part
    "&#8707;": "∃", //Exist
    "&exist;": "∃", //Exist
    "&#8709;": "∅", //Empty
    "&empty;": "∅", //Empty
    "&#8711;": "∇", //Nabla
    "&nabla;": "∇", //Nabla
    "&#8712;": "∈", //Is in
    "&isin;": "∈", //Is in
    "&#8713;": "∉", //Not in
    "&notin;": "∉", //Not in
    "&#8715;": "∋", //Ni
    "&ni;": "∋", //Ni
    "&#8719;": "∏", //Product
    "&prod;": "∏", //Product
    "&#8721;": "∑", //Sum
    "&sum;": "∑", //Sum
    "&#8722;": "−", //Minus
    "&minus;": "−", //Minus
    "&#8727;": "∗", //Asterisk (Lowast)
    "&lowast;": "∗", //Asterisk (Lowast)
    "&#8730;": "√", //Square root
    "&radic;": "√", //Square root
    "&#8733;": "∝", //Proportional to
    "&prop;": "∝", //Proportional to
    "&#8734;": "∞", //Infinity
    "&infin;": "∞", //Infinity
    "&#8736;": "∠", //Angle
    "&ang;": "∠", //Angle
    "&#8743;": "∧", //And
    "&and;": "∧", //And
    "&#8744;": "∨", //Or
    "&or;": "∨", //Or
    "&#8745;": "∩", //Cap
    "&cap;": "∩", //Cap
    "&#8746;": "∪", //Cup
    "&cup;": "∪", //Cup
    "&#8747;": "∫", //Integral
    "&int;": "∫", //Integral
    "&#8756;": "∴", //Therefore
    "&there4;": "∴", //Therefore
    "&#8764;": "∼", //Similar to
    "&sim;": "∼", //Similar to
    "&#8773;": "≅", //Congurent to
    "&cong;": "≅", //Congurent to
    "&#8776;": "≈", //Almost equal
    "&asymp;": "≈", //Almost equal
    "&#8800;": "≠", //Not equal
    "&ne;": "≠", //Not equal
    "&#8801;": "≡", //Equivalent
    "&equiv;": "≡", //Equivalent
    "&#8804;": "≤", //Less or equal
    "&le;": "≤", //Less or equal
    "&#8805;": "≥", //Greater or equal
    "&ge;": "≥", //Greater or equal
    "&#8834;": "⊂", //Subset of
    "&sub;": "⊂", //Subset of
    "&#8835;": "⊃", //Superset of
    "&sup;": "⊃", //Superset of
    "&#8836;": "⊄", //Not subset of
    "&nsub;": "⊄", //Not subset of
    "&#8838;": "⊆", //Subset or equal
    "&sube;": "⊆", //Subset or equal
    "&#8839;": "⊇", //Superset or equal
    "&supe;": "⊇", //Superset or equal
    "&#8853;": "⊕", //Circled plus
    "&oplus;": "⊕", //Circled plus
    "&#8855;": "⊗", //Circled times
    "&otimes;": "⊗", //Circled times
    "&#8869;": "⊥", //Perpendicular
    "&perp;": "⊥", //Perpendicular
    "&#8901;": "⋅", //Dot operator
    "&sdot;": "⋅", //Dot operator
    "&#8968;": "⌈", //Left ceiling
    "&lceil;": "⌈", //Left ceiling
    "&#8969;": "⌉", //Right ceiling
    "&rceil;": "⌉", //Right ceiling
    "&#8970;": "⌊", //Left floor
    "&lfloor;": "⌊", //Left floor
    "&#8971;": "⌋", //Right floor
    "&rfloor;": "⌋", //Right floor
    "&#9674;": "◊", //Lozenge
    "&loz;": "◊", //Lozenge
    "&#9824;": "♠", //Spade
    "&spades;": "♠", //Spade
    "&#9827;": "♣", //Club
    "&clubs;": "♣", //Club
    "&#9829;": "♥", //Heart
    "&hearts;": "♥", //Heart
    "&#9830;": "♦", //Diamonds
    "&diams;": "♦", //Diamond
  };
  return src.replace(/&#{0,1}[0-9A-z]+;/mg, (s) => cM[s]);
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