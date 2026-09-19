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
// 2. 預設常用受語庫 (Preset Objects)
// ==========================================
const SENTENCE_OBJECTS = [
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
        id: "obj_11",
        zh: "學校 (地點)",
        kr: "학교",
        category: "place",
        batchim: false,
        particle: "에",
        isPlace: true,
        emoji: "🏫",
        desc: "地點 (去向 에 / 在 에서)"
    },
    {
        id: "obj_12",
        zh: "咖啡廳 (地點)",
        kr: "카페",
        category: "place",
        batchim: false,
        particle: "에서",
        isPlace: true,
        emoji: "☕",
        desc: "地點場所"
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
            '커피를': 'keo-pi-reul', '밥을': 'ba-beul', '물을': 'mu-reul', '한국어를': 'han-gu-geo-reul',
            '책을': 'chae-geul', '영화를': 'yeong-hwa-reul', '음악을': 'eu-ma-geul', '사과를': 'sa-gwa-reul',
            '빵을': 'ppang-eul', '옷을': 'o-seul', '학교에': 'hak-gyo-e', '카페에서': 'ka-pe-e-seo',
            '집에': 'ji-be', '회사에': 'hoe-sa-e', '서울에': 'seo-u-re',
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
            '왔습니다': 'wat-seum-ni-da', '왔어요': 'wa-sseo-yo', '왔어': 'wa-sseo',
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
    }
};

// ==========================================
// 5. 6 條精選人氣列車路線預設 (Preset Sample Routes)
// ==========================================
const PRESET_TRAIN_ROUTES = [
    {
        id: "route_1",
        title: "☕ 經典咖啡時光號",
        badge: "入門必學",
        subjectId: "sub_1", // 我
        objectId: "obj_1",  // 咖啡
        verbId: "verb_1",   // 喝
        desc: "我 ＋ 咖啡 ＋ 喝 ➔ 저는 커피를 마셔요 (我喝咖啡)"
    },
    {
        id: "route_2",
        title: "🍱 媽媽美食補給號",
        badge: "日常飲食",
        subjectId: "sub_7", // 媽媽
        objectId: "obj_2",  // 白飯
        verbId: "verb_2",   // 吃
        desc: "媽媽 ＋ 白飯 ＋ 吃 ➔ 엄마가 밥을 먹어요"
    },
    {
        id: "route_3",
        title: "🇰🇷 熱血韓語學習號",
        badge: "動詞 하다",
        subjectId: "sub_1", // 我
        objectId: "obj_3",  // 韓語
        verbId: "verb_4",   // 學習
        desc: "我 ＋ 韓語 ＋ 學習 ➔ 저는 한국어를 공부해요"
    },
    {
        id: "route_4",
        title: "🎬 週末好友電影號",
        badge: "休閒約會",
        subjectId: "sub_3", // 朋友
        objectId: "obj_6",  // 電影
        verbId: "verb_3",   // 看
        desc: "朋友 ＋ 電影 ＋ 看 ➔ 친구가 영화를 봐요"
    },
    {
        id: "route_5",
        title: "🎧 流行音樂沉浸號",
        badge: "ㄷ 不規則",
        subjectId: "sub_1", // 我
        objectId: "obj_7",  // 音樂
        verbId: "verb_5",   // 聽
        desc: "我 ＋ 音樂 ＋ 聽 ➔ 저는 음악을 들어요"
    },
    {
        id: "route_6",
        title: "✨ Kitty 睡覺放鬆號",
        badge: "自動詞模式",
        subjectId: "sub_6", // Kitty
        objectId: "obj_none", // 無受詞
        verbId: "verb_8",   // 睡覺
        desc: "Kitty ＋ (無受詞) ＋ 睡覺 ➔ 키티가 자요"
    }
];

// 匯出全域變數
if (typeof window !== 'undefined') {
    window.SENTENCE_SUBJECTS = SENTENCE_SUBJECTS;
    window.SENTENCE_OBJECTS = SENTENCE_OBJECTS;
    window.SENTENCE_VERBS = SENTENCE_VERBS;
    window.HangulEngine = HangulEngine;
    window.PRESET_TRAIN_ROUTES = PRESET_TRAIN_ROUTES;
}
if (typeof global !== 'undefined') {
    global.SENTENCE_SUBJECTS = SENTENCE_SUBJECTS;
    global.SENTENCE_OBJECTS = SENTENCE_OBJECTS;
    global.SENTENCE_VERBS = SENTENCE_VERBS;
    global.HangulEngine = HangulEngine;
    global.PRESET_TRAIN_ROUTES = PRESET_TRAIN_ROUTES;
}
