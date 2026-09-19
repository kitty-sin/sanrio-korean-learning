/**
 * 🚂 KITTY 韓語造句積木列車 - 核心語料庫與語法變形引擎
 * Korean Sentence Train Builder - Core Dataset & Conjugator Engine
 */

// ==========================================
// 1. 預設常用主語庫 (Preset Subjects)
// ==========================================
const SENTENCE_SUBJECTS = [
    {
        id: "sub_1",
        zh: "我",
        kr: "나",
        type: "pronoun",
        honorific: "casual",
        forms: {
            topic: { formal: "저는", casual: "나는" },
            subject: { formal: "제가", casual: "내가" }
        },
        emoji: "🐥",
        desc: "第一人稱 (平語나 / 謙稱저)",
        cantoneseTip: "同朋友講用「나(Na)」，同長輩/客氣講用「저(Jeo)」！"
    },
    {
        id: "sub_2",
        zh: "你",
        kr: "너",
        type: "pronoun",
        honorific: "casual",
        forms: {
            topic: { formal: "당신은", casual: "너는" },
            subject: { formal: "당신이", casual: "네가(니가)" }
        },
        emoji: "🐰",
        desc: "第二人稱 (平語너 / 客氣당신)",
        cantoneseTip: "口語「네가」習慣讀成「니가 (Ni-ga)」避免同내가搞亂！"
    },
    {
        id: "sub_3",
        zh: "朋友",
        kr: "친구",
        type: "noun",
        batchim: false,
        forms: {
            topic: { formal: "친구는", casual: "친구는" },
            subject: { formal: "친구가", casual: "친구가" }
        },
        emoji: "🐶",
        desc: "無收音名詞",
        cantoneseTip: "친구 無收音，後面順暢接「는 / 가」！"
    },
    {
        id: "sub_4",
        zh: "老師",
        kr: "선생님",
        type: "noun",
        batchim: true,
        forms: {
            topic: { formal: "선생님은", casual: "선생님은" },
            subject: { formal: "선생님이", casual: "선생님이" }
        },
        emoji: "🐱",
        desc: "有收音 (ㅁ) 名詞",
        cantoneseTip: "선생님 有收音 ㅁ，接「은 / 이」連音化讀成 [선생니믄 / 선생니미]！"
    },
    {
        id: "sub_5",
        zh: "妹妹/弟弟",
        kr: "동생",
        type: "noun",
        batchim: true,
        forms: {
            topic: { formal: "동생은", casual: "동생은" },
            subject: { formal: "동생이", casual: "동생이" }
        },
        emoji: "🐻",
        desc: "有收音 (ㅇ) 名詞",
        cantoneseTip: "동생 有收音 ㅇ，接「은 / 이」！"
    },
    {
        id: "sub_6",
        zh: "Kitty 貓",
        kr: "키티",
        type: "noun",
        batchim: false,
        forms: {
            topic: { formal: "키티는", casual: "키티는" },
            subject: { formal: "키티가", casual: "키티가" }
        },
        emoji: "🎀",
        desc: "專有名詞 • 無收音",
        cantoneseTip: "可愛主角 Kitty，無收音接「는 / 가」！"
    },
    {
        id: "sub_7",
        zh: "媽媽",
        kr: "엄마",
        type: "noun",
        batchim: false,
        forms: {
            topic: { formal: "어머니는", casual: "엄마는" },
            subject: { formal: "어머니께서", casual: "엄마가" }
        },
        emoji: "👩",
        desc: "親屬稱謂 (엄마 / 어머니)",
        cantoneseTip: "平時講「엄마」，正式敬稱用「어머니」！"
    },
    {
        id: "sub_8",
        zh: "我們",
        kr: "우리",
        type: "pronoun",
        batchim: false,
        forms: {
            topic: { formal: "저희는", casual: "우리는" },
            subject: { formal: "저희가", casual: "우리가" }
        },
        emoji: "👭",
        desc: "第一人稱複數 (우리 / 저희)",
        cantoneseTip: "韓語好鍾意講「우리 (我哋)」，對長輩謙稱用「저희」！"
    }
];

// ==========================================
// 2. 預設常用地點/場所庫 (Preset Places - 車卡 2)
// ==========================================
const SENTENCE_PLACES = [
    {
        id: "plc_1",
        zh: "太空館",
        kr: "우주관",
        batchim: true,
        particle: "에서",
        emoji: "🪐",
        desc: "太空科技館 / 天文展館"
    },
    {
        id: "plc_2",
        zh: "家裡",
        kr: "집",
        batchim: true,
        particle: "에서",
        emoji: "🏠",
        desc: "家場所"
    },
    {
        id: "plc_3",
        zh: "客廳",
        kr: "거실",
        batchim: true,
        particle: "에서",
        emoji: "🛋️",
        desc: "客廳"
    },
    {
        id: "plc_4",
        zh: "學校",
        kr: "학교",
        batchim: false,
        particle: "에서",
        emoji: "🏫",
        desc: "學校"
    },
    {
        id: "plc_5",
        zh: "咖啡廳",
        kr: "카페",
        batchim: false,
        particle: "에서",
        emoji: "☕",
        desc: "咖啡店"
    },
    {
        id: "plc_6",
        zh: "圖書館",
        kr: "도서관",
        batchim: true,
        particle: "에서",
        emoji: "📚",
        desc: "圖書館"
    },
    {
        id: "plc_7",
        zh: "電影院",
        kr: "영화관",
        batchim: true,
        particle: "에서",
        emoji: "🎬",
        desc: "電影院"
    },
    {
        id: "plc_8",
        zh: "公園",
        kr: "공원",
        batchim: true,
        particle: "에서",
        emoji: "🌳",
        desc: "公園"
    },
    {
        id: "plc_9",
        zh: "房間",
        kr: "방",
        batchim: true,
        particle: "에서",
        emoji: "🛏️",
        desc: "房間"
    },
    {
        id: "plc_10",
        zh: "餐廳",
        kr: "식당",
        batchim: true,
        particle: "에서",
        emoji: "🍽️",
        desc: "餐廳"
    },
    {
        id: "plc_11",
        zh: "首爾",
        kr: "서울",
        batchim: true,
        particle: "에서",
        emoji: "🏙️",
        desc: "城市地點"
    },
    {
        id: "plc_none",
        zh: "（無特定地點 / 留空）",
        kr: "",
        batchim: false,
        particle: "",
        emoji: "✨",
        desc: "不指定地點"
    }
];

// ==========================================
// 3. 預設常用受語庫 (Preset Objects - 車卡 3)
// ==========================================
const SENTENCE_OBJECTS = [
    {
        id: "obj_moon",
        zh: "月亮",
        kr: "달",
        category: "nature",
        batchim: true,
        particle: "을",
        emoji: "🌙",
        desc: "有收音 (ㄹ)"
    },
    {
        id: "obj_star",
        zh: "星星",
        kr: "별",
        category: "nature",
        batchim: true,
        particle: "을",
        emoji: "⭐",
        desc: "有收音 (ㄹ)"
    },
    {
        id: "obj_sun",
        zh: "太陽",
        kr: "태양",
        category: "nature",
        batchim: true,
        particle: "을",
        emoji: "☀️",
        desc: "有收音 (ㅇ)"
    },
    {
        id: "obj_1",
        zh: "咖啡",
        kr: "커피",
        category: "drink",
        batchim: false,
        particle: "를",
        emoji: "☕",
        desc: "無收音 • 外來語"
    },
    {
        id: "obj_2",
        zh: "白飯/餐點",
        kr: "밥",
        category: "food",
        batchim: true,
        particle: "을",
        emoji: "🍚",
        desc: "有收音 (ㅂ)"
    },
    {
        id: "obj_3",
        zh: "韓語",
        kr: "한국어",
        category: "study",
        batchim: false,
        particle: "를",
        emoji: "🇰🇷",
        desc: "無收音 • 漢字詞"
    },
    {
        id: "obj_4",
        zh: "水",
        kr: "물",
        category: "drink",
        batchim: true,
        particle: "을",
        emoji: "💧",
        desc: "有收音 (ㄹ)"
    },
    {
        id: "obj_5",
        zh: "書本",
        kr: "책",
        category: "study",
        batchim: true,
        particle: "을",
        emoji: "📚",
        desc: "有收音 (ㄱ)"
    },
    {
        id: "obj_6",
        zh: "電影",
        kr: "영화",
        category: "media",
        batchim: false,
        particle: "를",
        emoji: "🎬",
        desc: "無收音 • 漢字詞"
    },
    {
        id: "obj_7",
        zh: "音樂",
        kr: "음악",
        category: "media",
        batchim: true,
        particle: "을",
        emoji: "🎵",
        desc: "有收音 (ㄱ)"
    },
    {
        id: "obj_8",
        zh: "蘋果",
        kr: "사과",
        category: "food",
        batchim: false,
        particle: "를",
        emoji: "🍎",
        desc: "無收音"
    },
    {
        id: "obj_9",
        zh: "麵包",
        kr: "빵",
        category: "food",
        batchim: true,
        particle: "을",
        emoji: "🍞",
        desc: "有收音 (ㅇ)"
    },
    {
        id: "obj_10",
        zh: "衣服",
        kr: "옷",
        category: "daily",
        batchim: true,
        particle: "을",
        emoji: "👗",
        desc: "有收音 (ㅅ)"
    },
    {
        id: "obj_none",
        zh: "（無受詞 / 自動詞）",
        kr: "",
        category: "none",
        batchim: false,
        particle: "",
        emoji: "✨",
        desc: "不需要受詞"
    }
];

// ==========================================
// 3. 預設常用動詞與形容詞庫 (Preset Verbs/Adjectives)
// ==========================================
const SENTENCE_VERBS = [
    {
        id: "verb_1",
        zh: "喝",
        kr: "마시다",
        stem: "마시",
        type: "verb",
        vowelType: "yin",
        irregular: null,
        emoji: "🥤",
        desc: "陰性母音 ㅣ 結合 ㅓ ➔ 마셔",
        cantoneseTip: "마시다 原形 ➔ 마셔요！口訣：飲啖茶 (Ma-syeo-yo)！"
    },
    {
        id: "verb_2",
        zh: "吃",
        kr: "먹다",
        stem: "먹",
        type: "verb",
        vowelType: "yin",
        irregular: null,
        emoji: "🍱",
        desc: "有收音 ㄱ 陰性母音 ㅓ ➔ 먹어",
        cantoneseTip: "먹다 原形 ➔ 먹어요 (Meo-geo-yo)！有收音連音化！"
    },
    {
        id: "verb_3",
        zh: "看/見",
        kr: "보다",
        stem: "보",
        type: "verb",
        vowelType: "yang",
        irregular: null,
        emoji: "👀",
        desc: "陽性母音 ㅗ 結合 ㅏ ➔ 봐",
        cantoneseTip: "보 + 아 ➔ 縮合為 봐요 (Bwa-yo)！"
    },
    {
        id: "verb_4",
        zh: "學習",
        kr: "공부하다",
        stem: "공부하",
        type: "verb",
        vowelType: "hada",
        irregular: null,
        emoji: "📖",
        desc: "하다 動詞一律變 해요",
        cantoneseTip: "只要見到「하다」結尾，日常敬語一律變「해요 (Hae-yo)」！"
    },
    {
        id: "verb_5",
        zh: "聽",
        kr: "듣다",
        stem: "듣",
        type: "verb",
        vowelType: "yin",
        irregular: "d",
        emoji: "🎧",
        desc: "ㄷ 不規則 ➔ 들어요 / 들었습니다",
        cantoneseTip: "ㄷ 遇到母音會變身成 ㄹ (Deul-eo-yo)！"
    },
    {
        id: "verb_6",
        zh: "讀/唸",
        kr: "읽다",
        stem: "읽",
        type: "verb",
        vowelType: "yin",
        irregular: null,
        emoji: "📑",
        desc: "雙收音 ㄺ ➔ 읽어요 [일거요]",
        cantoneseTip: "읽다 遇母音連音為 [일거요]！"
    },
    {
        id: "verb_7",
        zh: "買",
        kr: "사다",
        stem: "사",
        type: "verb",
        vowelType: "yang",
        irregular: null,
        emoji: "🛍️",
        desc: "陽性母音 ㅏ 同音吸收 ➔ 사요",
        cantoneseTip: "사 + 아요 ➔ 直接變成 사요 (Sa-yo)！"
    },
    {
        id: "verb_8",
        zh: "睡覺 (自動詞)",
        kr: "자다",
        stem: "자",
        type: "intransitive",
        vowelType: "yang",
        irregular: null,
        emoji: "😴",
        desc: "自動詞 • 無需受語",
        cantoneseTip: "自動詞唔需要受詞，直接講「자요 / 잡니다」！"
    },
    {
        id: "verb_9",
        zh: "去 (自動詞)",
        kr: "가다",
        stem: "가",
        type: "intransitive",
        vowelType: "yang",
        irregular: null,
        emoji: "🚶",
        desc: "自動詞 • 接地點 (학교에)",
        cantoneseTip: "去邊度接「~에 가요 (Ga-yo)」！"
    },
    {
        id: "verb_10",
        zh: "喜歡",
        kr: "좋아하다",
        stem: "좋아하",
        type: "verb",
        vowelType: "hada",
        irregular: null,
        emoji: "💖",
        desc: "他動詞 • 前面接受格 을/를",
        cantoneseTip: "좋아하다 是他動詞，前面一定要接「~을/를 좋아해요」！"
    },
    {
        id: "verb_11",
        zh: "好 (形容詞)",
        kr: "좋다",
        stem: "좋",
        type: "adj",
        vowelType: "yang",
        irregular: null,
        emoji: "👍",
        desc: "形容詞 • 前面接主格 이/가",
        cantoneseTip: "좋다 是形容詞，前面接「~이/가 좋아요」，唔可以接 을/를 喔！"
    },
    {
        id: "verb_12",
        zh: "漂亮 (形容詞)",
        kr: "예쁘다",
        stem: "예쁘",
        type: "adj",
        vowelType: "yin",
        irregular: "eu_drop",
        emoji: "✨",
        desc: "ㅡ 脫落不規則 ➔ 예뻐요",
        cantoneseTip: "ㅡ 脫落前字 ㅖ 是陰性，補 ㅓ 結合成 예뻐요 (Ye-ppeo-yo)！"
    }
];

// ==========================================
// 4. 韓語音節拆解與語法變形核心引擎 (Hangul Engine)
// ==========================================
const HangulEngine = {
    CHOSUNG: ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'],
    JUNGSUNG: ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'],
    JONGSUNG: ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'],

    decomposeChar(char) {
        const code = char.charCodeAt(0);
        if (code < 0xAC00 || code > 0xD7A3) {
            return { raw: char, isHangul: false };
        }
        const offset = code - 0xAC00;
        const jongIdx = offset % 28;
        const jungIdx = Math.floor((offset - jongIdx) / 28) % 21;
        const choIdx = Math.floor(Math.floor((offset - jongIdx) / 28) / 21);

        return {
            isHangul: true,
            raw: char,
            cho: this.CHOSUNG[choIdx],
            jung: this.JUNGSUNG[jungIdx],
            jong: this.JONGSUNG[jongIdx],
            hasBatchim: jongIdx > 0,
            jongIdx,
            jungIdx,
            choIdx
        };
    },

    hasBatchim(word) {
        if (!word || typeof word !== 'string') return false;
        const lastChar = word.trim().slice(-1);
        const decomposed = this.decomposeChar(lastChar);
        return decomposed.isHangul ? decomposed.hasBatchim : false;
    },

    composeChar(choIdx, jungIdx, jongIdx = 0) {
        const code = 0xAC00 + (choIdx * 21 * 28) + (jungIdx * 28) + jongIdx;
        return String.fromCharCode(code);
    },

    // 智能助詞生成
    getTopicParticle(word) {
        return this.hasBatchim(word) ? "은" : "는";
    },

    getSubjectParticle(word) {
        return this.hasBatchim(word) ? "이" : "가";
    },

    getObjectParticle(word) {
        return this.hasBatchim(word) ? "을" : "를";
    },

    // 韓語語幹變形引擎 (Conjugator)
    conjugate(verbObj, tense = "present", honorific = "informal", isQuestion = false, isNegative = false) {
        if (!verbObj) return "";

        const kr = verbObj.kr || verbObj;
        const stem = verbObj.stem || (kr.endsWith("다") ? kr.slice(0, -1) : kr);
        const lastChar = stem.slice(-1);
        const decomposed = this.decomposeChar(lastChar);
        const hasBat = decomposed.hasBatchim;

        // 1. 原形 (Dictionary Form)
        if (tense === "base") {
            return isNegative ? `안 ${kr}` : kr;
        }

        // 2. 現在進行式 (-고 있다)
        if (tense === "continuous") {
            const baseStem = stem;
            let ending = "";
            if (honorific === "formal") {
                ending = isQuestion ? "고 있습니까?" : "고 있습니다.";
            } else if (honorific === "informal") {
                ending = isQuestion ? "고 있어요?" : "고 있어요.";
            } else {
                ending = isQuestion ? "고 있어?" : "고 있어.";
            }
            return isNegative ? `안 ${baseStem}${ending}` : `${baseStem}${ending}`;
        }

        // 3. 現在式 (Present Simple)
        if (tense === "present") {
            if (honorific === "formal") {
                // 最高敬語：有收音 -습니다, 無收音 -ㅂ니다
                let conjugatedStem = stem;
                if (verbObj.irregular === "d" && hasBat) {
                    // ㄷ 不規則在 습니다 前不變：듣습니다
                }
                if (hasBat) {
                    return (isNegative ? "안 " : "") + conjugatedStem + (isQuestion ? "습니까?" : "습니다.");
                } else {
                    // 塞 ㅂ 收音
                    const newChar = this.composeChar(decomposed.choIdx, decomposed.jungIdx, 17); // 17 是 ㅂ
                    const restStem = stem.slice(0, -1);
                    return (isNegative ? "안 " : "") + restStem + newChar + (isQuestion ? "니까?" : "니다.");
                }
            }

            // 日常敬語 / 平語 (해요體 / 반말)
            let informalStem = this.getInformalStem(stem, verbObj);
            const ending = honorific === "informal" ? "요" : "";
            const punct = isQuestion ? "?" : (honorific === "informal" ? "." : "");
            return (isNegative ? "안 " : "") + informalStem + ending + punct;
        }

        // 4. 過去式 (Past Tense -았/었/했-)
        if (tense === "past") {
            const pastStem = this.getPastStem(stem, verbObj);
            if (honorific === "formal") {
                return (isNegative ? "안 " : "") + pastStem + (isQuestion ? "습니까?" : "습니다.");
            } else if (honorific === "informal") {
                return (isNegative ? "안 " : "") + pastStem + (isQuestion ? "어요?" : "어요.");
            } else {
                return (isNegative ? "안 " : "") + pastStem + (isQuestion ? "어?" : "어.");
            }
        }

        // 5. 未來式 (Future Tense -(으)ㄹ 것이다 / -(으)ㄹ 거예요)
        if (tense === "future") {
            let futureStem = "";
            if (verbObj.irregular === "d" && hasBat) {
                // 듣다 ➔ 들을
                const newChar = this.composeChar(decomposed.choIdx, decomposed.jungIdx, 8); // 8 是 ㄹ
                futureStem = stem.slice(0, -1) + newChar + "을";
            } else if (hasBat) {
                if (decomposed.jong === 'ㄹ') {
                    futureStem = stem; // 살다 ➔ 살
                } else {
                    futureStem = stem + "을"; // 먹다 ➔ 먹을
                }
            } else {
                // 無收音塞 ㄹ
                const newChar = this.composeChar(decomposed.choIdx, decomposed.jungIdx, 8); // 8 是 ㄹ
                futureStem = stem.slice(0, -1) + newChar;
            }

            if (honorific === "formal") {
                return (isNegative ? "안 " : "") + futureStem + (isQuestion ? " 겁니까?" : " 겁니다.");
            } else if (honorific === "informal") {
                return (isNegative ? "안 " : "") + futureStem + (isQuestion ? " 거예요?" : " 거예요.");
            } else {
                return (isNegative ? "안 " : "") + futureStem + (isQuestion ? " 거야?" : " 거야.");
            }
        }

        return kr;
    },

    // 取得日常敬語詞幹 (Informal Stem Resolver)
    getInformalStem(stem, verbObj) {
        if (stem.endsWith("하")) {
            return stem.slice(0, -1) + "해";
        }

        const lastChar = stem.slice(-1);
        const decomposed = this.decomposeChar(lastChar);
        const restStem = stem.slice(0, -1);

        // ㄷ 不規則 (듣다 ➔ 들 + 어 ➔ 들어)
        if (verbObj.irregular === "d" && decomposed.hasBatchim) {
            const newChar = this.composeChar(decomposed.choIdx, decomposed.jungIdx, 8); // ㄹ
            return restStem + newChar + "어";
        }

        // ㅡ 脫落不規則 (예쁘다 ➔ 예뻐, 쓰다 ➔ 써)
        if (verbObj.irregular === "eu_drop" || (decomposed.jung === 'ㅡ' && !decomposed.hasBatchim)) {
            let prevVowelYang = false;
            if (restStem.length > 0) {
                const prevDecomp = this.decomposeChar(restStem.slice(-1));
                if (['ㅏ','ㅗ','ㅑ'].includes(prevDecomp.jung)) prevVowelYang = true;
            }
            const targetJung = prevVowelYang ? 0 : 4; // 0=ㅏ, 4=ㅓ
            const newChar = this.composeChar(decomposed.choIdx, targetJung, 0);
            return restStem + newChar;
        }

        // 有收音
        if (decomposed.hasBatchim) {
            const isYang = ['ㅏ', 'ㅗ'].includes(decomposed.jung);
            return stem + (isYang ? "아" : "어");
        }

        // 無收音母音縮合
        // 1. ㅏ + 아 ➔ ㅏ (가다 ➔ 가, 사다 ➔ 사)
        if (decomposed.jung === 'ㅏ') return stem;
        // 2. ㅓ + 어 ➔ ㅓ (서다 ➔ 서)
        if (decomposed.jung === 'ㅓ') return stem;
        // 3. ㅗ + 아 ➔ ㅘ (보다 ➔ 봐, 오다 ➔ 와)
        if (decomposed.jung === 'ㅗ') {
            const newChar = this.composeChar(decomposed.choIdx, 9, 0); // 9 是 ㅘ
            return restStem + newChar;
        }
        // 4. ㅜ + 어 ➔ ㅝ (배우다 ➔ 배워, 주다 ➔ 줘)
        if (decomposed.jung === 'ㅜ') {
            const newChar = this.composeChar(decomposed.choIdx, 14, 0); // 14 是 ㅝ
            return restStem + newChar;
        }
        // 5. ㅣ + 어 ➔ ㅕ (마시다 ➔ 마셔, 기다리다 ➔ 기다려)
        if (decomposed.jung === 'ㅣ') {
            const newChar = this.composeChar(decomposed.choIdx, 6, 0); // 6 是 ㅕ
            return restStem + newChar;
        }
        // 6. ㅐ, ㅔ + 어 ➔ ㅐ, ㅔ (보내다 ➔ 보내)
        if (['ㅐ', 'ㅔ'].includes(decomposed.jung)) return stem;

        return stem + "어";
    },

    // 取得過去式核心詞幹 (Past Stem Resolver: 었/았/했)
    getPastStem(stem, verbObj) {
        const informal = this.getInformalStem(stem, verbObj);
        const lastChar = informal.slice(-1);
        const decomposed = this.decomposeChar(lastChar);
        // 在最後一個音節下方塞 ㅆ 收音 (jongIdx = 20)
        const withSsangSiot = this.composeChar(decomposed.choIdx, decomposed.jungIdx, 20);
        return informal.slice(0, -1) + withSsangSiot;
    },

    // 生成羅馬音標 (Romanization with Sound Rules & Smart Syllable Fallback)
    romanize(text) {
        if (!text) return "";
        const map = {
            '저는': 'Jeo-neun', '나는': 'Na-neun', '내가': 'Nae-ga', '제가': 'Je-ga',
            '너는': 'Neo-neun', '네가': 'Ne-ga', '당신은': 'Dang-sin-eun', '당신이': 'Dang-sin-i',
            '친구는': 'Chin-gu-neun', '친구가': 'Chin-gu-ga', '키티는': 'Ki-ti-neun', '키티가': 'Ki-ti-ga',
            '엄마는': 'Eom-ma-neun', '엄마가': 'Eom-ma-ga', '선생님은': 'Seon-saeng-nim-eun', '선생님이': 'Seon-saeng-nim-i',
            '동생은': 'Dong-saeng-eun', '동생이': 'Dong-saeng-i',
            // 地點/場所 (Places with 에서 / 에)
            '우주관에서': 'u-ju-gwa-ne-seo', '우주관에': 'u-ju-gwa-ne', '우주관': 'u-ju-gwan',
            '천문관에서': 'cheon-mun-gwa-ne-seo', '천문관에': 'cheon-mun-gwa-ne', '천문관': 'cheon-mun-gwan',
            '집에서': 'ji-be-seo', '집에': 'ji-be', '집': 'jip',
            '거실에서': 'geo-si-re-seo', '거실에': 'geo-si-re', '거실': 'geo-sil',
            '학교에서': 'hak-gyo-e-seo', '학교에': 'hak-gyo-e', '학교': 'hak-gyo',
            '카페에서': 'ka-pe-e-seo', '카페에': 'ka-pe-e', '카페': 'ka-pe',
            '도서관에서': 'do-seo-gwa-ne-seo', '도서관에': 'do-seo-gwa-ne', '도서관': 'do-seo-gwan',
            '영화관에서': 'yeong-hwa-gwa-ne-seo', '영화관에': 'yeong-hwa-gwa-ne', '영화관': 'yeong-hwa-gwan',
            '공원에서': 'gong-wo-ne-seo', '공원에': 'gong-wo-ne', '공원': 'gong-won',
            '방에서': 'bang-e-seo', '방에': 'bang-e', '방': 'bang',
            '식당에서': 'sik-dang-e-seo', '식당에': 'sik-dang-e', '식당': 'sik-dang',
            '서울에서': 'seo-u-re-seo', '서울에': 'seo-u-re', '서울': 'seo-ul',
            '회사에서': 'hoe-sa-e-seo', '회사에': 'hoe-sa-e', '회사': 'hoe-sa',
            // 受詞 (Objects with 을 / 를)
            '달을': 'da-reul', '달': 'dal',
            '별을': 'byeo-reul', '별': 'byeol',
            '태양을': 'tae-yang-eul', '태양': 'tae-yang',
            '커피를': 'keo-pi-reul', '커피': 'keo-pi',
            '밥을': 'ba-beul', '밥': 'bap',
            '물을': 'mu-reul', '물': 'mul',
            '한국어를': 'han-gu-geo-reul', '한국어': 'han-gu-geo',
            '책을': 'chae-geul', '책': 'chaek',
            '영화를': 'yeong-hwa-reul', '영화': 'yeong-hwa',
            '음악을': 'eu-ma-geul', '음악': 'eu-mak',
            '사과를': 'sa-gwa-reul', '사과': 'sa-gwa',
            '빵을': 'ppang-eul', '빵': 'ppang',
            '옷을': 'o-seul', '옷': 'ot',
            '핸드폰을': 'haen-deu-po-neul', '핸드폰': 'haen-deu-pon',
            // 現在式
            '마십니다': 'ma-sim-ni-da', '마셔요': 'ma-syeo-yo', '마셔': 'ma-syeo',
            '먹습니다': 'meok-seum-ni-da', '먹어요': 'meo-geo-yo', '먹어': 'meo-geo',
            '봅니다': 'bom-ni-da', '봐요': 'bwa-yo', '봐': 'bwa',
            '공부합니다': 'gong-bu-ham-ni-da', '공부해요': 'gong-bu-hae-yo', '공부해': 'gong-bu-hae',
            '듣습니다': 'deut-seum-ni-da', '들어요': 'deu-reo-yo', '들어': 'deu-reo',
            '읽습니다': 'ik-seum-ni-da', '읽어요': 'il-geo-yo', '읽어': 'il-geo',
            '삽니다': 'sam-ni-da', '사요': 'sa-yo', '사': 'sa',
            '잡니다': 'jam-ni-da', '자요': 'ja-yo', '자': 'ja',
            '갑니다': 'gam-ni-da', '가요': 'ga-yo', '가': 'ga',
            '옵니다': 'om-ni-da', '와요': 'wa-yo', '와': 'wa',
            '만납니다': 'man-nam-ni-da', '만나요': 'man-na-yo', '만나': 'man-na',
            '만듭니다': 'man-deum-ni-da', '만들어요': 'man-deu-reo-yo', '만들어': 'man-deu-reo',
            // 現在進行式 詞組
            '마시고': 'ma-si-go', '먹고': 'meok-go', '보고': 'bo-go', '공부하고': 'gong-bu-ha-go',
            '듣고': 'deut-go', '읽고': 'ik-go', '사고': 'sa-go', '자고': 'ja-go',
            '가고': 'ga-go', '오고': 'o-go', '만나고': 'man-na-go', '만들고': 'man-deul-go',
            '있습니다': 'ik-seum-ni-da', '있어요': 'it-seo-yo', '있어': 'it-seo',
            '있습니까': 'ik-seum-ni-kka', '있어요?': 'it-seo-yo?', '있어?': 'it-seo?',
            // 過去式
            '마셨습니다': 'ma-syeot-seum-ni-da', '마셨어요': 'ma-syeo-sseo-yo', '마셨어': 'ma-syeo-sseo',
            '먹었습니다': 'meo-geot-seum-ni-da', '먹었어요': 'meo-geo-sseo-yo', '먹었어': 'meo-geo-sseo',
            '봤습니다': 'bwat-seum-ni-da', '봤어요': 'bwa-sseo-yo', '봤어': 'bwa-sseo',
            '공부했습니다': 'gong-bu-haet-seum-ni-da', '공부했어요': 'gong-bu-haet-seo-yo', '공부했어': 'gong-bu-haet-seo',
            '들었습니다': 'deu-reot-seum-ni-da', '들었어요': 'deu-reo-sseo-yo', '들었어': 'deu-reo-sseo',
            '잤습니다': 'jat-seum-ni-da', '잤어요': 'ja-sseo-yo', '잤어': 'ja-sseo',
            '갔습니다': 'gat-seum-ni-da', '갔어요': 'ga-sseo-yo', '갔어': 'ga-sseo',
            // 否定與疑問句
            '안': 'an',
            '마십니까': 'ma-sim-ni-kka', '먹습니까': 'meok-seum-ni-kka', '봅니까': 'bom-ni-kka',
            '공부합니까': 'gong-bu-ham-ni-kka', '듣습니까': 'deut-seum-ni-kka', '읽습니까': 'ik-seum-ni-kka',
            '삽니까': 'sam-ni-kka', '잡니까': 'jam-ni-kka', '갑니까': 'gam-ni-kka',
            '옵니까': 'om-ni-kka', '만납니까': 'man-nam-ni-kka', '만듭니까': 'man-deum-ni-kka',
            // 未來式
            '마실': 'ma-sil', '먹을': 'meo-geul', '볼': 'bol', '공부할': 'gong-bu-hal',
            '들을': 'deu-reul', '잘': 'jal', '갈': 'gal', '올': 'ol', '읽을': 'il-geul', '살': 'sal',
            '만날': 'man-nal', '만들': 'man-deul',
            '겁니다': 'geom-ni-da', '거예요': 'geo-ye-yo', '거야': 'geo-ya',
            '겁니까': 'geom-ni-kka', '거예요?': 'geo-ye-yo?', '거야?': 'geo-ya?'
        };

        // 拆詞轉譯，若單詞有在字典則直接輸出，否則做字元級羅馬化轉換
        const words = text.replace(/[.?!]/g, '').trim().split(/\s+/);
        const romWords = words.map(w => {
            if (map[w]) return map[w];
            // 若沒有精確詞，嘗試逐音節拼音
            let charRoms = [];
            for (let i = 0; i < w.length; i++) {
                const c = w[i];
                const d = this.decomposeChar(c);
                if (!d.isHangul) {
                    charRoms.push(c);
                    continue;
                }
                const choRom = ['g','kk','n','d','tt','r','m','b','pp','s','ss','','j','jj','ch','k','t','p','h'][d.choIdx] || '';
                const jungRom = ['a','ae','ya','yae','eo','e','yeo','ye','o','wa','wae','oe','yo','u','wo','we','wi','yu','eu','ui','i'][d.jungIdx] || '';
                const jongRom = ['','k','k','k','n','n','n','t','l','k','m','p','l','t','p','l','m','p','p','t','t','ng','t','t','k','t','p','t'][d.jongIdx] || '';
                charRoms.push(choRom + jungRom + jongRom);
            }
            return charRoms.join('-');
        });
        return romWords.join(' ');
    },

    // 全能多語言智慧轉譯器 (Universal Multi-Language Translator: EN / KR / ZH 繁簡)
    universalTranslate(input, carType = "auto") {
        if (!input || typeof input !== 'string') return null;
        const clean = input.trim();
        if (!clean) return null;

        // 1. 韓文字元判定 (Hangul Range)
        const hasHangul = /[\uac00-\ud7a3\u1100-\u11ff\u3130-\u318f]/.test(clean);
        if (hasHangul) {
            // 從四大專屬預設庫搜尋
            const sub = SENTENCE_SUBJECTS.find(s => s.kr === clean);
            if (sub) return { kr: sub.kr, zh: sub.zh, en: sub.en || sub.id, type: "subject" };
            const plc = SENTENCE_PLACES.find(p => p.kr === clean);
            if (plc) return { kr: plc.kr, zh: plc.zh, en: plc.en || plc.id, type: "place", particleType: "actionPlace" };
            const obj = SENTENCE_OBJECTS.find(o => o.kr === clean);
            if (obj) return { kr: obj.kr, zh: obj.zh, en: obj.en || obj.id, type: "object", particleType: obj.category === 'none' ? 'none' : 'object' };
            const vrb = SENTENCE_VERBS.find(v => v.kr === clean || v.stem === clean);
            if (vrb) return { kr: vrb.kr, zh: vrb.zh, en: vrb.en || vrb.id, type: "verb", stem: vrb.stem, irregular: vrb.irregular };

            // 若為動詞原形以「다」結尾
            if (clean.endsWith('다') && clean.length >= 2) {
                return { kr: clean, zh: clean, en: clean, type: "verb", stem: clean.slice(0, -1) };
            }

            // 嘗試從全域詞庫反查釋義
            if (typeof window !== 'undefined') {
                const allVocabs = [...(window.KITTY_VOCAB_KITTY_ADD || []), ...(window.KITTY_VOCAB_5666 || [])];
                const found = allVocabs.find(v => v.kr === clean);
                if (found) {
                    const isV = found.pos && (found.pos.includes('動') || found.pos.includes('形') || found.kr.endsWith('다'));
                    return {
                        kr: found.kr,
                        zh: found.zh,
                        en: found.en || '',
                        type: isV ? "verb" : "object",
                        stem: isV && found.kr.endsWith('다') ? found.kr.slice(0, -1) : found.kr
                    };
                }
            }
            return { kr: clean, zh: clean, en: clean, type: carType || "auto", stem: clean.endsWith('다') ? clean.slice(0, -1) : clean };
        }

        // 2. 純英文字串判定 (English Range)
        const isEnglish = /^[a-zA-Z0-9\s'.,!?-]+$/.test(clean);
        if (isEnglish) {
            const cleanEn = clean.toLowerCase().replace(/^(the|a|an)\s+/i, '').trim();

            const enMap = {
                // 人名與專有名詞 (English Names & Proper Nouns)
                'john': { kr: '존', zh: '約翰', en: 'John', type: 'subject' },
                'mary': { kr: '메리', zh: '瑪麗', en: 'Mary', type: 'subject' },
                'tom': { kr: '톰', zh: '湯姆', en: 'Tom', type: 'subject' },
                'david': { kr: '데이비드', zh: '大衛', en: 'David', type: 'subject' },
                'kitty': { kr: '키티', zh: 'Kitty 貓', en: 'Kitty', type: 'subject' },
                'hello kitty': { kr: '키티', zh: 'Kitty 貓', en: 'Kitty', type: 'subject' },
                'lisa': { kr: '리사', zh: '麗莎', en: 'Lisa', type: 'subject' },
                'jenny': { kr: '제니', zh: '珍妮', en: 'Jenny', type: 'subject' },
                'jennie': { kr: '제니', zh: '珍妮', en: 'Jenny', type: 'subject' },
                'minsu': { kr: '민수', zh: '敏洙', en: 'Min-su', type: 'subject' },
                'min-su': { kr: '민수', zh: '敏洙', en: 'Min-su', type: 'subject' },
                'peter': { kr: '피터', zh: '彼得', en: 'Peter', type: 'subject' },
                'sam': { kr: '샘', zh: '山姆', en: 'Sam', type: 'subject' },

                // 主語 (Subjects)
                'i': { kr: '나', zh: '我', en: 'I / Me', type: 'subject' },
                'me': { kr: '나', zh: '我', en: 'Me', type: 'subject' },
                'you': { kr: '너', zh: '你', en: 'You', type: 'subject' },
                'we': { kr: '우리', zh: '我們', en: 'We', type: 'subject' },
                'us': { kr: '우리', zh: '我們', en: 'Us', type: 'subject' },
                'friend': { kr: '친구', zh: '朋友', en: 'Friend', type: 'subject' },
                'friends': { kr: '친구들', zh: '朋友們', en: 'Friends', type: 'subject' },
                'teacher': { kr: '선생님', zh: '老師', en: 'Teacher', type: 'subject' },
                'brother': { kr: '동생', zh: '弟弟/哥哥', en: 'Brother', type: 'subject' },
                'younger brother': { kr: '동생', zh: '弟弟', en: 'Younger brother', type: 'subject' },
                'older brother': { kr: '오빠', zh: '哥哥', en: 'Older brother', type: 'subject' },
                'sister': { kr: '동생', zh: '妹妹/姐姐', en: 'Sister', type: 'subject' },
                'younger sister': { kr: '여동생', zh: '妹妹', en: 'Younger sister', type: 'subject' },
                'older sister': { kr: '언니', zh: '姐姐', en: 'Older sister', type: 'subject' },
                'mom': { kr: '엄마', zh: '媽媽', en: 'Mom', type: 'subject' },
                'mother': { kr: '엄마', zh: '媽媽', en: 'Mother', type: 'subject' },
                'dad': { kr: '아빠', zh: '爸爸', en: 'Dad', type: 'subject' },
                'father': { kr: '아빠', zh: '爸爸', en: 'Father', type: 'subject' },
                'student': { kr: '학생', zh: '學生', en: 'Student', type: 'subject' },
                'everyone': { kr: '여러분', zh: '大家', en: 'Everyone', type: 'subject' },

                // 地點 (Places)
                'space museum': { kr: '우주관', zh: '太空館', en: 'Space Museum', type: 'place', particleType: 'place' },
                'space center': { kr: '우주관', zh: '太空中心', en: 'Space Center', type: 'place', particleType: 'place' },
                'planetarium': { kr: '우주관', zh: '天文館', en: 'Planetarium', type: 'place', particleType: 'place' },
                'observatory': { kr: '우주관', zh: '天文觀測台', en: 'Observatory', type: 'place', particleType: 'place' },
                'home': { kr: '집', zh: '家裡', en: 'Home', type: 'place', particleType: 'place' },
                'house': { kr: '집', zh: '家', en: 'House', type: 'place', particleType: 'place' },
                'living room': { kr: '거실', zh: '客廳', en: 'Living room', type: 'place', particleType: 'place' },
                'school': { kr: '학교', zh: '學校', en: 'School', type: 'place', particleType: 'place' },
                'cafe': { kr: '카페', zh: '咖啡廳', en: 'Cafe', type: 'place', particleType: 'place' },
                'coffee shop': { kr: '카페', zh: '咖啡店', en: 'Coffee shop', type: 'place', particleType: 'place' },
                'library': { kr: '도서관', zh: '圖書館', en: 'Library', type: 'place', particleType: 'place' },
                'cinema': { kr: '영화관', zh: '電影院', en: 'Cinema', type: 'place', particleType: 'place' },
                'movie theater': { kr: '영화관', zh: '電影院', en: 'Movie theater', type: 'place', particleType: 'place' },
                'park': { kr: '공원', zh: '公園', en: 'Park', type: 'place', particleType: 'place' },
                'room': { kr: '방', zh: '房間', en: 'Room', type: 'place', particleType: 'place' },
                'bedroom': { kr: '방', zh: '房間', en: 'Bedroom', type: 'place', particleType: 'place' },
                'restaurant': { kr: '식당', zh: '餐廳', en: 'Restaurant', type: 'place', particleType: 'place' },
                'seoul': { kr: '서울', zh: '首爾', en: 'Seoul', type: 'place', particleType: 'place' },
                'korea': { kr: '한국', zh: '韓國', en: 'Korea', type: 'place', particleType: 'place' },
                'company': { kr: '회사', zh: '公司', en: 'Company', type: 'place', particleType: 'place' },
                'office': { kr: '회사', zh: '辦公室', en: 'Office', type: 'place', particleType: 'place' },

                // 受語 (Objects)
                'moon': { kr: '달', zh: '月亮', en: 'Moon', type: 'object' },
                'the moon': { kr: '달', zh: '月亮', en: 'The Moon', type: 'object' },
                'star': { kr: '별', zh: '星星', en: 'Star', type: 'object' },
                'stars': { kr: '별', zh: '星星', en: 'Stars', type: 'object' },
                'sun': { kr: '태양', zh: '太陽', en: 'Sun', type: 'object' },
                'the sun': { kr: '태양', zh: '太陽', en: 'The Sun', type: 'object' },
                'coffee': { kr: '커피', zh: '咖啡', en: 'Coffee', type: 'object' },
                'rice': { kr: '밥', zh: '白飯', en: 'Rice', type: 'object' },
                'meal': { kr: '밥', zh: '餐點/飯', en: 'Meal', type: 'object' },
                'food': { kr: '음식', zh: '食物', en: 'Food', type: 'object' },
                'water': { kr: '물', zh: '水', en: 'Water', type: 'object' },
                'book': { kr: '책', zh: '書本', en: 'Book', type: 'object' },
                'books': { kr: '책', zh: '書本', en: 'Books', type: 'object' },
                'movie': { kr: '영화', zh: '電影', en: 'Movie', type: 'object' },
                'film': { kr: '영화', zh: '電影', en: 'Film', type: 'object' },
                'music': { kr: '음악', zh: '音樂', en: 'Music', type: 'object' },
                'song': { kr: '노래', zh: '歌曲', en: 'Song', type: 'object' },
                'apple': { kr: '사과', zh: '蘋果', en: 'Apple', type: 'object' },
                'apples': { kr: '사과', zh: '蘋果', en: 'Apples', type: 'object' },
                'bread': { kr: '빵', zh: '麵包', en: 'Bread', type: 'object' },
                'cake': { kr: '케이크', zh: '蛋糕', en: 'Cake', type: 'object' },
                'clothes': { kr: '옷', zh: '衣服', en: 'Clothes', type: 'object' },
                'phone': { kr: '핸드폰', zh: '手機', en: 'Phone', type: 'object' },
                'cellphone': { kr: '핸드폰', zh: '手機', en: 'Cellphone', type: 'object' },
                'letter': { kr: '편지', zh: '信件', en: 'Letter', type: 'object' },
                'gift': { kr: '선물', zh: '禮物', en: 'Gift', type: 'object' },
                'present': { kr: '선물', zh: '禮物', en: 'Present', type: 'object' },
                'money': { kr: '돈', zh: '金錢', en: 'Money', type: 'object' },
                'korean': { kr: '한국어', zh: '韓語', en: 'Korean language', type: 'object' },
                'korean language': { kr: '한국어', zh: '韓語', en: 'Korean language', type: 'object' },

                // 動詞 (Verbs & English Compound Verbs)
                'watch the moon': { kr: '보다', zh: '看', en: 'Watch the moon', type: 'verb', stem: '보', autoObject: { zh: '月亮', kr: '달', en: 'Moon' } },
                'watch moon': { kr: '보다', zh: '看', en: 'Watch moon', type: 'verb', stem: '보', autoObject: { zh: '月亮', kr: '달', en: 'Moon' } },
                'see the moon': { kr: '보다', zh: '看', en: 'See the moon', type: 'verb', stem: '보', autoObject: { zh: '月亮', kr: '달', en: 'Moon' } },
                'see moon': { kr: '보다', zh: '看', en: 'See moon', type: 'verb', stem: '보', autoObject: { zh: '月亮', kr: '달', en: 'Moon' } },
                'look at the moon': { kr: '보다', zh: '看', en: 'Look at the moon', type: 'verb', stem: '보', autoObject: { zh: '月亮', kr: '달', en: 'Moon' } },
                'look at moon': { kr: '보다', zh: '看', en: 'Look at moon', type: 'verb', stem: '보', autoObject: { zh: '月亮', kr: '달', en: 'Moon' } },
                'watch movie': { kr: '보다', zh: '看', en: 'Watch movie', type: 'verb', stem: '보', autoObject: { zh: '電影', kr: '영화', en: 'Movie' } },
                'watch a movie': { kr: '보다', zh: '看', en: 'Watch a movie', type: 'verb', stem: '보', autoObject: { zh: '電影', kr: '영화', en: 'Movie' } },
                'drink coffee': { kr: '마시다', zh: '喝', en: 'Drink coffee', type: 'verb', stem: '마시', autoObject: { zh: '咖啡', kr: '커피', en: 'Coffee' } },
                'drink water': { kr: '마시다', zh: '喝', en: 'Drink water', type: 'verb', stem: '마시', autoObject: { zh: '水', kr: '물', en: 'Water' } },
                'eat meal': { kr: '먹다', zh: '吃', en: 'Eat meal', type: 'verb', stem: '먹', autoObject: { zh: '白飯', kr: '밥', en: 'Rice' } },
                'eat rice': { kr: '먹다', zh: '吃', en: 'Eat rice', type: 'verb', stem: '먹', autoObject: { zh: '白飯', kr: '밥', en: 'Rice' } },
                'eat apple': { kr: '먹다', zh: '吃', en: 'Eat apple', type: 'verb', stem: '먹', autoObject: { zh: '蘋果', kr: '사과', en: 'Apple' } },
                'eat an apple': { kr: '먹다', zh: '吃', en: 'Eat an apple', type: 'verb', stem: '먹', autoObject: { zh: '蘋果', kr: '사과', en: 'Apple' } },
                'read book': { kr: '읽다', zh: '讀', en: 'Read book', type: 'verb', stem: '읽', autoObject: { zh: '書本', kr: '책', en: 'Book' } },
                'read a book': { kr: '읽다', zh: '讀', en: 'Read a book', type: 'verb', stem: '읽', autoObject: { zh: '書本', kr: '책', en: 'Book' } },
                'listen to music': { kr: '듣다', zh: '聽', en: 'Listen to music', type: 'verb', stem: '듣', irregular: 'd', autoObject: { zh: '音樂', kr: '음악', en: 'Music' } },
                'study korean': { kr: '공부하다', zh: '學習', en: 'Study Korean', type: 'verb', stem: '공부하', autoObject: { zh: '韓語', kr: '한국어', en: 'Korean' } },
                'learn korean': { kr: '배우다', zh: '學習', en: 'Learn Korean', type: 'verb', stem: '배우', autoObject: { zh: '韓語', kr: '한국어', en: 'Korean' } },

                // 動詞原詞 (Base English Verbs)
                'see': { kr: '보다', zh: '看', en: 'See', type: 'verb', stem: '보' },
                'watch': { kr: '보다', zh: '看/觀看', en: 'Watch', type: 'verb', stem: '보' },
                'look': { kr: '보다', zh: '看', en: 'Look', type: 'verb', stem: '보' },
                'eat': { kr: '먹다', zh: '吃', en: 'Eat', type: 'verb', stem: '먹' },
                'drink': { kr: '마시다', zh: '喝', en: 'Drink', type: 'verb', stem: '마시' },
                'read': { kr: '읽다', zh: '閱讀/讀', en: 'Read', type: 'verb', stem: '읽' },
                'listen': { kr: '듣다', zh: '聽', en: 'Listen', type: 'verb', stem: '듣', irregular: 'd' },
                'hear': { kr: '듣다', zh: '聽', en: 'Hear', type: 'verb', stem: '듣', irregular: 'd' },
                'buy': { kr: '사다', zh: '買', en: 'Buy', type: 'verb', stem: '사' },
                'purchase': { kr: '사다', zh: '購買', en: 'Purchase', type: 'verb', stem: '사' },
                'sleep': { kr: '자다', zh: '睡覺', en: 'Sleep', type: 'verb', stem: '자' },
                'go': { kr: '가다', zh: '去', en: 'Go', type: 'verb', stem: '가' },
                'come': { kr: '오다', zh: '來', en: 'Come', type: 'verb', stem: '오' },
                'meet': { kr: '만나다', zh: '見面', en: 'Meet', type: 'verb', stem: '만나' },
                'make': { kr: '만들다', zh: '製作/做', en: 'Make', type: 'verb', stem: '만들' },
                'rest': { kr: '쉬다', zh: '休息', en: 'Rest', type: 'verb', stem: '쉬' },
                'exercise': { kr: '운동하다', zh: '運動', en: 'Exercise', type: 'verb', stem: '운동하' },
                'work': { kr: '일하다', zh: '工作', en: 'Work', type: 'verb', stem: '일하' },
                'study': { kr: '공부하다', zh: '學習/讀書', en: 'Study', type: 'verb', stem: '공부하' },
                'learn': { kr: '배우다', zh: '學習', en: 'Learn', type: 'verb', stem: '배우' },
                'sing': { kr: '노래하다', zh: '唱歌', en: 'Sing', type: 'verb', stem: '노래하' },
                'cook': { kr: '요리하다', zh: '料理/煮飯', en: 'Cook', type: 'verb', stem: '요리하' },
                'teach': { kr: '가르치다', zh: '教導', en: 'Teach', type: 'verb', stem: '가르치' },
                'write': { kr: '쓰다', zh: '寫', en: 'Write', type: 'verb', stem: '쓰' },
                'wear': { kr: '입다', zh: '穿', en: 'Wear', type: 'verb', stem: '입' },
                'wait': { kr: '기다리다', zh: '等待', en: 'Wait', type: 'verb', stem: '기다리' },
                'call': { kr: '전화하다', zh: '打電話', en: 'Call', type: 'verb', stem: '전화하' },
                'like': { kr: '좋아하다', zh: '喜歡', en: 'Like', type: 'verb', stem: '좋아하' },
                'love': { kr: '사랑하다', zh: '愛', en: 'Love', type: 'verb', stem: '사랑하' },
                'pretty': { kr: '예쁘다', zh: '漂亮', en: 'Pretty', type: 'verb', stem: '예쁘' },
                'beautiful': { kr: '아름답다', zh: '美麗', en: 'Beautiful', type: 'verb', stem: '아름답' },
                'good': { kr: '좋다', zh: '好', en: 'Good', type: 'verb', stem: '좋' },
                'delicious': { kr: '맛있다', zh: '好吃', en: 'Delicious', type: 'verb', stem: '맛있' },
                'busy': { kr: '바쁘다', zh: '忙碌', en: 'Busy', type: 'verb', stem: '바쁘' }
            };

            // 比對 enMap
            if (enMap[cleanEn]) {
                return enMap[cleanEn];
            }
            for (const [key, val] of Object.entries(enMap)) {
                if (cleanEn === key || cleanEn.includes(key) || key.includes(cleanEn)) {
                    return val;
                }
            }

            // 英文未知人名/字串回退處理
            return {
                kr: clean,
                zh: clean,
                en: clean,
                type: carType || "subject"
            };
        }

        // 3. 中文 (繁體 / 簡體) 轉譯
        const cleanZh = clean;

        // 擴充通用繁簡中韓對照表
        const zhMap = {
            // 主語 (Subjects)
            '約翰': { kr: '존', zh: '約翰', en: 'John', type: 'subject' },
            '约翰': { kr: '존', zh: '約翰', en: 'John', type: 'subject' },
            '瑪麗': { kr: '메리', zh: '瑪麗', en: 'Mary', type: 'subject' },
            '玛丽': { kr: '메리', zh: '瑪麗', en: 'Mary', type: 'subject' },
            '湯姆': { kr: '톰', zh: '湯姆', en: 'Tom', type: 'subject' },
            '汤姆': { kr: '톰', zh: '湯姆', en: 'Tom', type: 'subject' },
            '敏洙': { kr: '민수', zh: '敏洙', en: 'Min-su', type: 'subject' },
            '我': { kr: '나', zh: '我', en: 'I / Me', type: 'subject' },
            '你': { kr: '너', zh: '你', en: 'You', type: 'subject' },
            '您': { kr: '당신', zh: '您', en: 'You', type: 'subject' },
            '朋友': { kr: '친구', zh: '朋友', en: 'Friend', type: 'subject' },
            '老師': { kr: '선생님', zh: '老師', en: 'Teacher', type: 'subject' },
            '老师': { kr: '선생님', zh: '老師', en: 'Teacher', type: 'subject' },
            '先生': { kr: '선생님', zh: '老師', en: 'Teacher', type: 'subject' },
            '媽媽': { kr: '엄마', zh: '媽媽', en: 'Mom', type: 'subject' },
            '妈妈': { kr: '엄마', zh: '媽媽', en: 'Mom', type: 'subject' },
            '媽': { kr: '엄마', zh: '媽媽', en: 'Mom', type: 'subject' },
            '妈': { kr: '엄마', zh: '媽媽', en: 'Mom', type: 'subject' },
            '爸爸': { kr: '아빠', zh: '爸爸', en: 'Dad', type: 'subject' },
            '爸': { kr: '아빠', zh: '爸爸', en: 'Dad', type: 'subject' },
            '弟弟': { kr: '동생', zh: '弟弟', en: 'Younger brother', type: 'subject' },
            '弟': { kr: '동생', zh: '弟弟', en: 'Younger brother', type: 'subject' },
            '男弟弟': { kr: '남동생', zh: '弟弟', en: 'Younger brother', type: 'subject' },
            '妹妹': { kr: '동생', zh: '妹妹', en: 'Younger sister', type: 'subject' },
            '妹': { kr: '동생', zh: '妹妹', en: 'Younger sister', type: 'subject' },
            '女妹妹': { kr: '여동생', zh: '妹妹', en: 'Younger sister', type: 'subject' },
            '弟妹': { kr: '동생', zh: '弟弟/妹妹', en: 'Sibling', type: 'subject' },
            '哥哥': { kr: '오빠', zh: '哥哥', en: 'Older brother', type: 'subject' },
            '哥': { kr: '오빠', zh: '哥哥', en: 'Older brother', type: 'subject' },
            '姐姐': { kr: '언니', zh: '姐姐', en: 'Older sister', type: 'subject' },
            '姐': { kr: '언니', zh: '姐姐', en: 'Older sister', type: 'subject' },
            '學生': { kr: '학생', zh: '學生', en: 'Student', type: 'subject' },
            '学生': { kr: '학생', zh: '學生', en: 'Student', type: 'subject' },
            '大家': { kr: '여러분', zh: '大家', en: 'Everyone', type: 'subject' },
            'kitty': { kr: '키티', zh: 'Kitty 貓', en: 'Kitty', type: 'subject' },
            '吉蒂': { kr: '키티', zh: 'Kitty 貓', en: 'Kitty', type: 'subject' },
            '凱蒂': { kr: '키티', zh: 'Kitty 貓', en: 'Kitty', type: 'subject' },

            // 地點/場所 (Places - 支援繁簡)
            '太空館': { kr: '우주관', zh: '太空館', en: 'Space Museum', type: 'place', particleType: 'place' },
            '太空馆': { kr: '우주관', zh: '太空館', en: 'Space Museum', type: 'place', particleType: 'place' },
            '太空': { kr: '우주', zh: '太空', en: 'Space', type: 'place', particleType: 'place' },
            '天文館': { kr: '천문관', zh: '天文館', en: 'Planetarium', type: 'place', particleType: 'place' },
            '天文馆': { kr: '천문관', zh: '天文館', en: 'Planetarium', type: 'place', particleType: 'place' },
            '科學館': { kr: '과학관', zh: '科學館', en: 'Science Museum', type: 'place', particleType: 'place' },
            '科学馆': { kr: '과학관', zh: '科學館', en: 'Science Museum', type: 'place', particleType: 'place' },
            '博物館': { kr: '박물관', zh: '博物館', en: 'Museum', type: 'place', particleType: 'place' },
            '博物馆': { kr: '박물관', zh: '博物館', en: 'Museum', type: 'place', particleType: 'place' },
            '客廳': { kr: '거실', zh: '客廳', en: 'Living room', type: 'place', particleType: 'place' },
            '客厅': { kr: '거실', zh: '客廳', en: 'Living room', type: 'place', particleType: 'place' },
            '在家裡客廳': { kr: '거실', zh: '客廳', en: 'Living room', type: 'place', particleType: 'place' },
            '家裡的客廳': { kr: '거실', zh: '客廳', en: 'Living room', type: 'place', particleType: 'place' },
            '家': { kr: '집', zh: '家', en: 'Home', type: 'place', particleType: 'place' },
            '家裡': { kr: '집', zh: '家裡', en: 'Home', type: 'place', particleType: 'place' },
            '家里': { kr: '집', zh: '家裡', en: 'Home', type: 'place', particleType: 'place' },
            '在家': { kr: '집', zh: '在家', en: 'At home', type: 'place', particleType: 'place' },
            '在家裡': { kr: '집', zh: '在家裡', en: 'At home', type: 'place', particleType: 'place' },
            '學校': { kr: '학교', zh: '學校', en: 'School', type: 'place', particleType: 'place' },
            '学校': { kr: '학교', zh: '學校', en: 'School', type: 'place', particleType: 'place' },
            '咖啡廳': { kr: '카페', zh: '咖啡廳', en: 'Cafe', type: 'place', particleType: 'place' },
            '咖啡馆': { kr: '카페', zh: '咖啡館', en: 'Cafe', type: 'place', particleType: 'place' },
            '咖啡店': { kr: '카페', zh: '咖啡店', en: 'Cafe', type: 'place', particleType: 'place' },
            '公司': { kr: '회사', zh: '公司', en: 'Company', type: 'place', particleType: 'place' },
            '圖書館': { kr: '도서관', zh: '圖書館', en: 'Library', type: 'place', particleType: 'place' },
            '图书馆': { kr: '도서관', zh: '圖書館', en: 'Library', type: 'place', particleType: 'place' },
            '電影院': { kr: '영화관', zh: '電影院', en: 'Cinema', type: 'place', particleType: 'place' },
            '电影院': { kr: '영화관', zh: '電影院', en: 'Cinema', type: 'place', particleType: 'place' },
            '公園': { kr: '공원', zh: '公園', en: 'Park', type: 'place', particleType: 'place' },
            '公园': { kr: '공원', zh: '公園', en: 'Park', type: 'place', particleType: 'place' },
            '餐廳': { kr: '식당', zh: '餐廳', en: 'Restaurant', type: 'place', particleType: 'place' },
            '餐厅': { kr: '식당', zh: '餐廳', en: 'Restaurant', type: 'place', particleType: 'place' },
            '房間': { kr: '방', zh: '房間', en: 'Room', type: 'place', particleType: 'place' },
            '房间': { kr: '방', zh: '房間', en: 'Room', type: 'place', particleType: 'place' },
            '首爾': { kr: '서울', zh: '首爾', en: 'Seoul', type: 'place', particleType: 'place' },
            '首尔': { kr: '서울', zh: '首爾', en: 'Seoul', type: 'place', particleType: 'place' },
            '韓國': { kr: '한국', zh: '韓國', en: 'Korea', type: 'place', particleType: 'place' },
            '韩国': { kr: '한국', zh: '韓國', en: 'Korea', type: 'place', particleType: 'place' },

            // 受語 (Objects - 支援繁簡)
            '月亮': { kr: '달', zh: '月亮', en: 'Moon', type: 'object' },
            '月': { kr: '달', zh: '月亮', en: 'Moon', type: 'object' },
            '月球': { kr: '달', zh: '月亮', en: 'Moon', type: 'object' },
            '星星': { kr: '별', zh: '星星', en: 'Star', type: 'object' },
            '星': { kr: '별', zh: '星星', en: 'Star', type: 'object' },
            '太陽': { kr: '태양', zh: '太陽', en: 'Sun', type: 'object' },
            '太阳': { kr: '태양', zh: '太陽', en: 'Sun', type: 'object' },
            '日': { kr: '해', zh: '太陽', en: 'Sun', type: 'object' },
            '咖啡': { kr: '커피', zh: '咖啡', en: 'Coffee', type: 'object' },
            '飯': { kr: '밥', zh: '飯', en: 'Rice/Meal', type: 'object' },
            '饭': { kr: '밥', zh: '飯', en: 'Rice/Meal', type: 'object' },
            '白飯': { kr: '밥', zh: '白飯', en: 'Rice', type: 'object' },
            '白饭': { kr: '밥', zh: '白飯', en: 'Rice', type: 'object' },
            '餐點': { kr: '밥', zh: '餐點', en: 'Meal', type: 'object' },
            '餐点': { kr: '밥', zh: '餐點', en: 'Meal', type: 'object' },
            '韓語': { kr: '한국어', zh: '韓語', en: 'Korean', type: 'object' },
            '韩语': { kr: '한국어', zh: '韓語', en: 'Korean', type: 'object' },
            '韓文': { kr: '한국어', zh: '韓文', en: 'Korean', type: 'object' },
            '韩文': { kr: '한국어', zh: '韓文', en: 'Korean', type: 'object' },
            '水': { kr: '물', zh: '水', en: 'Water', type: 'object' },
            '書': { kr: '책', zh: '書', en: 'Book', type: 'object' },
            '书': { kr: '책', zh: '書', en: 'Book', type: 'object' },
            '書本': { kr: '책', zh: '書本', en: 'Book', type: 'object' },
            '书本': { kr: '책', zh: '書本', en: 'Book', type: 'object' },
            '電影': { kr: '영화', zh: '電影', en: 'Movie', type: 'object' },
            '电影': { kr: '영화', zh: '電影', en: 'Movie', type: 'object' },
            '音樂': { kr: '음악', zh: '音樂', en: 'Music', type: 'object' },
            '音乐': { kr: '음악', zh: '音樂', en: 'Music', type: 'object' },
            '蘋果': { kr: '사과', zh: '蘋果', en: 'Apple', type: 'object' },
            '苹果': { kr: '사과', zh: '蘋果', en: 'Apple', type: 'object' },
            '麵包': { kr: '빵', zh: '麵包', en: 'Bread', type: 'object' },
            '面包': { kr: '빵', zh: '麵包', en: 'Bread', type: 'object' },
            '蛋糕': { kr: '케이크', zh: '蛋糕', en: 'Cake', type: 'object' },
            '衣服': { kr: '옷', zh: '衣服', en: 'Clothes', type: 'object' },
            '手機': { kr: '핸드폰', zh: '手機', en: 'Phone', type: 'object' },
            '手机': { kr: '핸드폰', zh: '手機', en: 'Phone', type: 'object' },
            '電話': { kr: '전화', zh: '電話', en: 'Phone', type: 'object' },
            '电话': { kr: '전화', zh: '電話', en: 'Phone', type: 'object' },
            '照片': { kr: '사진', zh: '照片', en: 'Photo', type: 'object' },
            '信': { kr: '편지', zh: '信', en: 'Letter', type: 'object' },
            '禮物': { kr: '선물', zh: '禮物', en: 'Gift', type: 'object' },
            '礼物': { kr: '선물', zh: '禮物', en: 'Gift', type: 'object' },
            '錢': { kr: '돈', zh: '錢', en: 'Money', type: 'object' },
            '钱': { kr: '돈', zh: '錢', en: 'Money', type: 'object' },

            // 動詞 (Verbs - 含複合輸入拆解)
            '看月亮': { kr: '보다', zh: '看', en: 'Watch the moon', type: 'verb', stem: '보', autoObject: { zh: '月亮', kr: '달', en: 'Moon' } },
            '看月': { kr: '보다', zh: '看', en: 'Watch moon', type: 'verb', stem: '보', autoObject: { zh: '月亮', kr: '달', en: 'Moon' } },
            '看星星': { kr: '보다', zh: '看', en: 'Watch stars', type: 'verb', stem: '보', autoObject: { zh: '星星', kr: '별', en: 'Star' } },
            '看電影': { kr: '보다', zh: '看', en: 'Watch movie', type: 'verb', stem: '보', autoObject: { zh: '電影', kr: '영화', en: 'Movie' } },
            '看电影': { kr: '보다', zh: '看', en: 'Watch movie', type: 'verb', stem: '보', autoObject: { zh: '電影', kr: '영화', en: 'Movie' } },
            '喝咖啡': { kr: '마시다', zh: '喝', en: 'Drink coffee', type: 'verb', stem: '마시', autoObject: { zh: '咖啡', kr: '커피', en: 'Coffee' } },
            '喝水': { kr: '마시다', zh: '喝', en: 'Drink water', type: 'verb', stem: '마시', autoObject: { zh: '水', kr: '물', en: 'Water' } },
            '吃飯': { kr: '먹다', zh: '吃', en: 'Eat rice/meal', type: 'verb', stem: '먹', autoObject: { zh: '白飯', kr: '밥', en: 'Rice' } },
            '吃饭': { kr: '먹다', zh: '吃', en: 'Eat rice/meal', type: 'verb', stem: '먹', autoObject: { zh: '白飯', kr: '밥', en: 'Rice' } },
            '吃蘋果': { kr: '먹다', zh: '吃', en: 'Eat apple', type: 'verb', stem: '먹', autoObject: { zh: '蘋果', kr: '사과', en: 'Apple' } },
            '吃苹果': { kr: '먹다', zh: '吃', en: 'Eat apple', type: 'verb', stem: '먹', autoObject: { zh: '蘋果', kr: '사과', en: 'Apple' } },
            '學習韓語': { kr: '공부하다', zh: '學習', en: 'Study Korean', type: 'verb', stem: '공부하', autoObject: { zh: '韓語', kr: '한국어', en: 'Korean' } },
            '学习韩语': { kr: '공부하다', zh: '學習', en: 'Study Korean', type: 'verb', stem: '공부하', autoObject: { zh: '韓語', kr: '한국어', en: 'Korean' } },
            '學韓語': { kr: '공부하다', zh: '學習', en: 'Learn Korean', type: 'verb', stem: '공부하', autoObject: { zh: '韓語', kr: '한국어', en: 'Korean' } },
            '学韩语': { kr: '공부하다', zh: '學習', en: 'Learn Korean', type: 'verb', stem: '공부하', autoObject: { zh: '韓語', kr: '한국어', en: 'Korean' } },
            '聽音樂': { kr: '듣다', zh: '聽', en: 'Listen to music', type: 'verb', stem: '듣', irregular: 'd', autoObject: { zh: '音樂', kr: '음악', en: 'Music' } },
            '听音乐': { kr: '듣다', zh: '聽', en: 'Listen to music', type: 'verb', stem: '듣', irregular: 'd', autoObject: { zh: '音樂', kr: '음악', en: 'Music' } },
            '讀書': { kr: '공부하다', zh: '讀書', en: 'Study', type: 'verb', stem: '공부하' },
            '读书': { kr: '공부하다', zh: '讀書', en: 'Study', type: 'verb', stem: '공부하' },
            '念書': { kr: '공부하다', zh: '念書', en: 'Study', type: 'verb', stem: '공부하' },
            '念书': { kr: '공부하다', zh: '念書', en: 'Study', type: 'verb', stem: '공부하' },
            '學習': { kr: '공부하다', zh: '學習', en: 'Study', type: 'verb', stem: '공부하' },
            '学习': { kr: '공부하다', zh: '學習', en: 'Study', type: 'verb', stem: '공부하' },
            '學': { kr: '배우다', zh: '學習/學', en: 'Learn', type: 'verb', stem: '배우' },
            '学': { kr: '배우다', zh: '學習/學', en: 'Learn', type: 'verb', stem: '배우' },
            '喝': { kr: '마시다', zh: '喝', en: 'Drink', type: 'verb', stem: '마시' },
            '飲': { kr: '마시다', zh: '喝', en: 'Drink', type: 'verb', stem: '마시' },
            '饮': { kr: '마시다', zh: '喝', en: 'Drink', type: 'verb', stem: '마시' },
            '吃': { kr: '먹다', zh: '吃', en: 'Eat', type: 'verb', stem: '먹' },
            '食': { kr: '먹다', zh: '吃', en: 'Eat', type: 'verb', stem: '먹' },
            '看': { kr: '보다', zh: '看', en: 'See/Watch', type: 'verb', stem: '보' },
            '見': { kr: '보다', zh: '看', en: 'See', type: 'verb', stem: '보' },
            '见': { kr: '보다', zh: '看', en: 'See', type: 'verb', stem: '보' },
            '觀看': { kr: '보다', zh: '觀看', en: 'Watch', type: 'verb', stem: '보' },
            '观看': { kr: '보다', zh: '觀看', en: 'Watch', type: 'verb', stem: '보' },
            '聽': { kr: '듣다', zh: '聽', en: 'Listen', type: 'verb', stem: '듣', irregular: 'd' },
            '听': { kr: '듣다', zh: '聽', en: 'Listen', type: 'verb', stem: '듣', irregular: 'd' },
            '讀': { kr: '읽다', zh: '讀', en: 'Read', type: 'verb', stem: '읽' },
            '读': { kr: '읽다', zh: '讀', en: 'Read', type: 'verb', stem: '읽' },
            '閱讀': { kr: '읽다', zh: '閱讀', en: 'Read', type: 'verb', stem: '읽' },
            '阅读': { kr: '읽다', zh: '閱讀', en: 'Read', type: 'verb', stem: '읽' },
            '買': { kr: '사다', zh: '買', en: 'Buy', type: 'verb', stem: '사' },
            '买': { kr: '사다', zh: '買', en: 'Buy', type: 'verb', stem: '사' },
            '購買': { kr: '사다', zh: '購買', en: 'Purchase', type: 'verb', stem: '사' },
            '购买': { kr: '사다', zh: '購買', en: 'Purchase', type: 'verb', stem: '사' },
            '睡': { kr: '자다', zh: '睡覺', en: 'Sleep', type: 'verb', stem: '자' },
            '睡覺': { kr: '자다', zh: '睡覺', en: 'Sleep', type: 'verb', stem: '자' },
            '睡觉': { kr: '자다', zh: '睡覺', en: 'Sleep', type: 'verb', stem: '자' },
            '去': { kr: '가다', zh: '去', en: 'Go', type: 'verb', stem: '가' },
            '前往': { kr: '가다', zh: '前往', en: 'Go', type: 'verb', stem: '가' },
            '來': { kr: '오다', zh: '來', en: 'Come', type: 'verb', stem: '오' },
            '来': { kr: '오다', zh: '來', en: 'Come', type: 'verb', stem: '오' },
            '見面': { kr: '만나다', zh: '見面', en: 'Meet', type: 'verb', stem: '만나' },
            '见面': { kr: '만나다', zh: '見面', en: 'Meet', type: 'verb', stem: '交代' },
            '做': { kr: '만들다', zh: '製作', en: 'Make', type: 'verb', stem: '만들' },
            '製作': { kr: '만들다', zh: '製作', en: 'Make', type: 'verb', stem: '만들' },
            '制作': { kr: '만들다', zh: '製作', en: 'Make', type: 'verb', stem: '만들' },
            '休息': { kr: '쉬다', zh: '休息', en: 'Rest', type: 'verb', stem: '쉬' },
            '運動': { kr: '운동하다', zh: '運動', en: 'Exercise', type: 'verb', stem: '운동하' },
            '运动': { kr: '운동하다', zh: '運動', en: 'Exercise', type: 'verb', stem: '운동하' },
            '工作': { kr: '일하다', zh: '工作', en: 'Work', type: 'verb', stem: '일하' },
            '上班': { kr: '일하다', zh: '上班', en: 'Work', type: 'verb', stem: '일하' },
            '聊天': { kr: '이야기하다', zh: '聊天', en: 'Chat', type: 'verb', stem: '이야기하' },
            '唱歌': { kr: '노래하다', zh: '唱歌', en: 'Sing', type: 'verb', stem: '노래하' },
            '料理': { kr: '요리하다', zh: '料理', en: 'Cook', type: 'verb', stem: '요리하' },
            '煮飯': { kr: '요리하다', zh: '煮飯', en: 'Cook', type: 'verb', stem: '요리하' },
            '煮饭': { kr: '요리하다', zh: '煮飯', en: 'Cook', type: 'verb', stem: '요리하' },
            '教': { kr: '가르치다', zh: '教', en: 'Teach', type: 'verb', stem: '가르치' },
            '寫': { kr: '쓰다', zh: '寫', en: 'Write', type: 'verb', stem: '쓰' },
            '写': { kr: '쓰다', zh: '寫', en: 'Write', type: 'verb', stem: '쓰' },
            '穿': { kr: '입다', zh: '穿', en: 'Wear', type: 'verb', stem: '입' },
            '等': { kr: '기다리다', zh: '等', en: 'Wait', type: 'verb', stem: '기다리' },
            '等待': { kr: '기다리다', zh: '等待', en: 'Wait', type: 'verb', stem: '기다리' },
            '打電話': { kr: '전화하다', zh: '打電話', en: 'Call', type: 'verb', stem: '전화하' },
            '打电话': { kr: '전화하다', zh: '打電話', en: 'Call', type: 'verb', stem: '전화하' },
            '喜歡': { kr: '좋아하다', zh: '喜歡', en: 'Like', type: 'verb', stem: '좋아하' },
            '喜欢': { kr: '좋아하다', zh: '喜歡', en: 'Like', type: 'verb', stem: '좋아하' },
            '愛': { kr: '사랑하다', zh: '愛', en: 'Love', type: 'verb', stem: '사랑하' },
            '爱': { kr: '사랑하다', zh: '愛', en: 'Love', type: 'verb', stem: '사랑하' },
            '漂亮': { kr: '예쁘다', zh: '漂亮', en: 'Pretty', type: 'verb', stem: '예쁘' },
            '好': { kr: '좋다', zh: '好', en: 'Good', type: 'verb', stem: '좋' },
            '好吃': { kr: '맛있다', zh: '好吃', en: 'Delicious', type: 'verb', stem: '맛있' },
            '忙': { kr: '바쁘다', zh: '忙', en: 'Busy', type: 'verb', stem: '바쁘' }
        };

        // 優先精確比對 zhMap
        if (zhMap[cleanZh]) {
            return zhMap[cleanZh];
        }

        // 依車卡類型精確檢索四大專屬語料庫
        if (carType === "subject") {
            const sub = SENTENCE_SUBJECTS.find(s => s.zh === cleanZh);
            if (sub) return { kr: sub.kr, zh: sub.zh, en: sub.en || '', type: "subject" };
        } else if (carType === "place") {
            const plc = SENTENCE_PLACES.find(p => p.zh === cleanZh);
            if (plc) return { kr: plc.kr, zh: plc.zh, en: plc.en || '', type: "place", particleType: "actionPlace" };
        } else if (carType === "object") {
            const obj = SENTENCE_OBJECTS.find(o => o.zh === cleanZh);
            if (obj) return { kr: obj.kr, zh: obj.zh, en: obj.en || '', type: "object", particleType: obj.category === 'none' ? 'none' : 'object' };
        } else if (carType === "verb") {
            const vrb = SENTENCE_VERBS.find(v => v.zh === cleanZh);
            if (vrb) return { kr: vrb.kr, zh: vrb.zh, en: vrb.en || '', type: "verb", stem: vrb.stem, irregular: vrb.irregular };
        }

        // 模糊比對 zhMap (優先比對相同車卡類型)
        for (const [key, val] of Object.entries(zhMap)) {
            if (carType !== "auto" && val.type !== carType) continue;
            if (cleanZh === key || cleanZh.includes(key) || key.includes(cleanZh)) {
                return val;
            }
        }

        // 嘗試從全域 TOPIK 詞庫、Kitty自訂詞庫或漢字大辭典檢索
        if (typeof window !== 'undefined') {
            const allVocabs = [
                ...(window.KITTY_VOCAB_KITTY_ADD || []),
                ...(window.KITTY_VOCAB_5666 || [])
            ];
            const found = allVocabs.find(v => v.zh && (v.zh.includes(cleanZh) || cleanZh.includes(v.zh)));
            if (found) {
                const isV = found.pos && (found.pos.includes('動') || found.pos.includes('形') || found.kr.endsWith('다'));
                return {
                    kr: found.kr,
                    zh: found.zh,
                    en: found.en || '',
                    type: isV ? "verb" : "object",
                    stem: isV && found.kr.endsWith('다') ? found.kr.slice(0, -1) : found.kr
                };
            }
        }

        return {
            kr: clean,
            zh: clean,
            en: clean,
            type: carType || "auto",
            stem: clean.endsWith('다') ? clean.slice(0, -1) : clean
        };
    },

    // 向下相容轉譯器接口 (Backward Compatibility)
    translateZhToKr(zhText, type = "auto") {
        return this.universalTranslate(zhText, type);
    }
};

// ==========================================
// 5. 7 條精選人氣列車路線預設 (Preset Sample Routes - 4 節車卡架構)
// ==========================================
const PRESET_TRAIN_ROUTES = [
    {
        id: "route_space",
        title: "🪐 弟弟太空館看月亮",
        badge: "4卡示範 • S+P+O+V",
        subjectId: "sub_5",  // 弟弟
        placeId: "plc_1",    // 太空館
        objectId: "obj_moon",// 月亮
        verbId: "verb_3",    // 看
        desc: "弟弟 ＋ 太空館(에서) ＋ 月亮(을) ＋ 看 ➔ 동생은 우주관에서 달을 봐요"
    },
    {
        id: "route_1",
        title: "☕ 經典咖啡時光號",
        badge: "入門必學",
        subjectId: "sub_1", // 我
        placeId: "plc_5",   // 咖啡廳
        objectId: "obj_1",  // 咖啡
        verbId: "verb_1",   // 喝
        desc: "我 ＋ 咖啡廳(에서) ＋ 咖啡(를) ＋ 喝 ➔ 저는 카페에서 커피를 마셔요"
    },
    {
        id: "route_2",
        title: "🍱 媽媽美食補給號",
        badge: "日常飲食",
        subjectId: "sub_7", // 媽媽
        placeId: "plc_2",   // 家裡
        objectId: "obj_2",  // 白飯
        verbId: "verb_2",   // 吃
        desc: "媽媽 ＋ 家裡(에서) ＋ 白飯(을) ＋ 吃 ➔ 엄마가 집에서 밥을 먹어요"
    },
    {
        id: "route_3",
        title: "🇰🇷 熱血韓語學習號",
        badge: "動詞 하다",
        subjectId: "sub_1", // 我
        placeId: "plc_6",   // 圖書館
        objectId: "obj_3",  // 韓語
        verbId: "verb_4",   // 學習
        desc: "我 ＋ 圖書館(에서) ＋ 韓語(를) ＋ 學習 ➔ 저는 도서관에서 한국어를 공부해요"
    },
    {
        id: "route_4",
        title: "🎬 週末好友電影號",
        badge: "休閒約會",
        subjectId: "sub_3", // 朋友
        placeId: "plc_7",   // 電影院
        objectId: "obj_6",  // 電影
        verbId: "verb_3",   // 看
        desc: "朋友 ＋ 電影院(에서) ＋ 電影(를) ＋ 看 ➔ 친구가 영화관에서 영화를 봐요"
    },
    {
        id: "route_5",
        title: "🎧 流行音樂沉浸號",
        badge: "ㄷ 不規則",
        subjectId: "sub_1", // 我
        placeId: "plc_9",   // 房間
        objectId: "obj_7",  // 音樂
        verbId: "verb_5",   // 聽
        desc: "我 ＋ 房間(에서) ＋ 音樂(을) ＋ 聽 ➔ 저는 방에서 음악을 들어요"
    },
    {
        id: "route_6",
        title: "✨ Kitty 睡覺放鬆號",
        badge: "自動詞模式",
        subjectId: "sub_6",   // Kitty
        placeId: "plc_none",  // 無地點
        objectId: "obj_none", // 無受詞
        verbId: "verb_8",     // 睡覺
        desc: "Kitty ＋ 睡覺 ➔ 키티가 자요"
    }
];

// 匯出全域變數
if (typeof window !== 'undefined') {
    window.SENTENCE_SUBJECTS = SENTENCE_SUBJECTS;
    window.SENTENCE_PLACES = SENTENCE_PLACES;
    window.SENTENCE_OBJECTS = SENTENCE_OBJECTS;
    window.SENTENCE_VERBS = SENTENCE_VERBS;
    window.HangulEngine = HangulEngine;
    window.PRESET_TRAIN_ROUTES = PRESET_TRAIN_ROUTES;
}
if (typeof global !== 'undefined') {
    global.SENTENCE_SUBJECTS = SENTENCE_SUBJECTS;
    global.SENTENCE_PLACES = SENTENCE_PLACES;
    global.SENTENCE_OBJECTS = SENTENCE_OBJECTS;
    global.SENTENCE_VERBS = SENTENCE_VERBS;
    global.HangulEngine = HangulEngine;
    global.PRESET_TRAIN_ROUTES = PRESET_TRAIN_ROUTES;
}
