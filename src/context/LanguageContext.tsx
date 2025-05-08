
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

// Define language codes and direction
export type LanguageCode = 'en' | 'fa' | 'ar' | 'ru' | 'zh' | 'ko';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
}

export const languages: Record<LanguageCode, Language> = {
  en: { code: 'en', name: 'English', nativeName: 'English', direction: 'ltr' },
  fa: { code: 'fa', name: 'Persian', nativeName: 'فارسی', direction: 'rtl' },
  ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية', direction: 'rtl' },
  ru: { code: 'ru', name: 'Russian', nativeName: 'Русский', direction: 'ltr' },
  zh: { code: 'zh', name: 'Chinese', nativeName: '中文', direction: 'ltr' },
  ko: { code: 'ko', name: 'Korean', nativeName: '한국어', direction: 'ltr' },
};

// Create translations object for all supported languages
export const translations = {
  en: {
    // Common
    appName: 'CryptoTongue',
    cancel: 'Cancel',
    confirm: 'Confirm',
    send: 'Send',
    connect: 'Connect',
    disconnect: 'Disconnect',
    loading: 'Loading...',
    copy: 'Copy',
    copied: 'Copied!',
    
    // Auth
    connectWallet: 'Connect Wallet',
    walletConnected: 'Wallet Connected',
    yourAddress: 'Your Address',
    
    // Navigation
    chats: 'Chats',
    contacts: 'Contacts',
    settings: 'Settings',
    
    // Messages
    typeMessage: 'Type a message...',
    encryptedMessage: 'Encrypted message',
    messageDecrypted: 'Message decrypted',
    sendEncrypted: 'Send Encrypted',
    
    // Contacts
    addContact: 'Add Contact',
    enterAddress: 'Enter wallet address',
    contactName: 'Contact Name',
    contactAdded: 'Contact Added',
    
    // Settings
    language: 'Language',
    darkMode: 'Dark Mode',
    encryption: 'Encryption',
    privateKey: 'Private Key',
    publicKey: 'Public Key',
    backupKeys: 'Backup Keys',
    
    // Onboarding
    welcome: 'Welcome to CryptoTongue',
    onboardingTitle1: 'Secure & Decentralized',
    onboardingDesc1: 'Messages are encrypted end-to-end and stored on decentralized networks',
    onboardingTitle2: 'Identity with Blockchain',
    onboardingDesc2: 'Your wallet is your identity - no username or password needed',
    onboardingTitle3: 'Complete Privacy',
    onboardingDesc3: 'Your keys are stored locally. We cannot access your messages',
    getStarted: 'Get Started',
    next: 'Next',
    skip: 'Skip',
  },
  fa: {
    // Persian translations
    appName: 'کریپتوتانگ',
    cancel: 'انصراف',
    confirm: 'تایید',
    send: 'ارسال',
    connect: 'اتصال',
    disconnect: 'قطع ارتباط',
    loading: 'در حال بارگذاری...',
    copy: 'کپی',
    copied: 'کپی شد!',
    
    connectWallet: 'اتصال کیف پول',
    walletConnected: 'کیف پول متصل است',
    yourAddress: 'آدرس شما',
    
    chats: 'گفتگوها',
    contacts: 'مخاطبین',
    settings: 'تنظیمات',
    
    typeMessage: 'پیامی بنویسید...',
    encryptedMessage: 'پیام رمزنگاری شده',
    messageDecrypted: 'پیام رمزگشایی شد',
    sendEncrypted: 'ارسال رمزنگاری شده',
    
    addContact: 'افزودن مخاطب',
    enterAddress: 'آدرس کیف پول را وارد کنید',
    contactName: 'نام مخاطب',
    contactAdded: 'مخاطب اضافه شد',
    
    language: 'زبان',
    darkMode: 'حالت تاریک',
    encryption: 'رمزنگاری',
    privateKey: 'کلید خصوصی',
    publicKey: 'کلید عمومی',
    backupKeys: 'پشتیبان‌گیری از کلیدها',
    
    welcome: 'به کریپتوتانگ خوش آمدید',
    onboardingTitle1: 'ایمن و غیرمتمرکز',
    onboardingDesc1: 'پیام‌ها از انتها به انتها رمزنگاری شده و در شبکه‌های غیرمتمرکز ذخیره می‌شوند',
    onboardingTitle2: 'هویت با بلاک‌چین',
    onboardingDesc2: 'کیف پول شما هویت شماست - بدون نیاز به نام کاربری یا رمز عبور',
    onboardingTitle3: 'حریم خصوصی کامل',
    onboardingDesc3: 'کلیدهای شما به صورت محلی ذخیره می‌شوند. ما نمی‌توانیم به پیام‌های شما دسترسی داشته باشیم',
    getStarted: 'شروع کنید',
    next: 'بعدی',
    skip: 'رد کردن',
  },
  ar: {
    // Arabic translations
    appName: 'كريبتو تونج',
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    send: 'إرسال',
    connect: 'توصيل',
    disconnect: 'قطع الاتصال',
    loading: 'جاري التحميل...',
    copy: 'نسخ',
    copied: 'تم النسخ!',
    
    connectWallet: 'توصيل المحفظة',
    walletConnected: 'المحفظة متصلة',
    yourAddress: 'عنوانك',
    
    chats: 'المحادثات',
    contacts: 'جهات الاتصال',
    settings: 'الإعدادات',
    
    typeMessage: 'اكتب رسالة...',
    encryptedMessage: 'رسالة مشفرة',
    messageDecrypted: 'تم فك تشفير الرسالة',
    sendEncrypted: 'إرسال مشفر',
    
    addContact: 'إضافة جهة اتصال',
    enterAddress: 'أدخل عنوان المحفظة',
    contactName: 'اسم جهة الاتصال',
    contactAdded: 'تمت إضافة جهة الاتصال',
    
    language: 'اللغة',
    darkMode: 'الوضع المظلم',
    encryption: 'التشفير',
    privateKey: 'المفتاح الخاص',
    publicKey: 'المفتاح العام',
    backupKeys: 'نسخ المفاتيح احتياطيًا',
    
    welcome: 'مرحبًا بك في كريبتو تونج',
    onboardingTitle1: 'آمن ولامركزي',
    onboardingDesc1: 'الرسائل مشفرة من طرف إلى طرف ومخزنة على شبكات لامركزية',
    onboardingTitle2: 'الهوية باستخدام بلوكتشين',
    onboardingDesc2: 'محفظتك هي هويتك - لا حاجة إلى اسم مستخدم أو كلمة مرور',
    onboardingTitle3: 'خصوصية كاملة',
    onboardingDesc3: 'يتم تخزين مفاتيحك محليًا. لا يمكننا الوصول إلى رسائلك',
    getStarted: 'البدء',
    next: 'التالي',
    skip: 'تخطي',
  },
  ru: {
    // Russian translations
    appName: 'КриптоТонг',
    cancel: 'Отмена',
    confirm: 'Подтвердить',
    send: 'Отправить',
    connect: 'Подключиться',
    disconnect: 'Отключиться',
    loading: 'Загрузка...',
    copy: 'Копировать',
    copied: 'Скопировано!',
    
    connectWallet: 'Подключить кошелек',
    walletConnected: 'Кошелек подключен',
    yourAddress: 'Ваш адрес',
    
    chats: 'Чаты',
    contacts: 'Контакты',
    settings: 'Настройки',
    
    typeMessage: 'Введите сообщение...',
    encryptedMessage: 'Зашифрованное сообщение',
    messageDecrypted: 'Сообщение расшифровано',
    sendEncrypted: 'Отправить зашифрованное',
    
    addContact: 'Добавить контакт',
    enterAddress: 'Введите адрес кошелька',
    contactName: 'Имя контакта',
    contactAdded: 'Контакт добавлен',
    
    language: 'Язык',
    darkMode: 'Темный режим',
    encryption: 'Шифрование',
    privateKey: 'Приватный ключ',
    publicKey: 'Публичный ключ',
    backupKeys: 'Резервное копирование ключей',
    
    welcome: 'Добро пожаловать в КриптоТонг',
    onboardingTitle1: 'Безопасный и децентрализованный',
    onboardingDesc1: 'Сообщения зашифрованы от начала до конца и хранятся в децентрализованных сетях',
    onboardingTitle2: 'Идентификация через блокчейн',
    onboardingDesc2: 'Ваш кошелек - ваша личность - не нужны имя пользователя или пароль',
    onboardingTitle3: 'Полная конфиденциальность',
    onboardingDesc3: 'Ваши ключи хранятся локально. Мы не можем получить доступ к вашим сообщениям',
    getStarted: 'Начать',
    next: 'Далее',
    skip: 'Пропустить',
  },
  zh: {
    // Chinese translations
    appName: '加密舌',
    cancel: '取消',
    confirm: '确认',
    send: '发送',
    connect: '连接',
    disconnect: '断开连接',
    loading: '加载中...',
    copy: '复制',
    copied: '已复制！',
    
    connectWallet: '连接钱包',
    walletConnected: '钱包已连接',
    yourAddress: '您的地址',
    
    chats: '聊天',
    contacts: '联系人',
    settings: '设置',
    
    typeMessage: '输入消息...',
    encryptedMessage: '加密消息',
    messageDecrypted: '消息已解密',
    sendEncrypted: '发送加密消息',
    
    addContact: '添加联系人',
    enterAddress: '输入钱包地址',
    contactName: '联系人名称',
    contactAdded: '联系人已添加',
    
    language: '语言',
    darkMode: '深色模式',
    encryption: '加密',
    privateKey: '私钥',
    publicKey: '公钥',
    backupKeys: '备份密钥',
    
    welcome: '欢迎使用加密舌',
    onboardingTitle1: '安全和去中心化',
    onboardingDesc1: '消息是端到端加密的，并存储在去中心化网络上',
    onboardingTitle2: '区块链身份',
    onboardingDesc2: '您的钱包就是您的身份 - 无需用户名或密码',
    onboardingTitle3: '完全隐私',
    onboardingDesc3: '您的密钥存储在本地。我们无法访问您的消息',
    getStarted: '开始使用',
    next: '下一步',
    skip: '跳过',
  },
  ko: {
    // Korean translations
    appName: '크립토텅',
    cancel: '취소',
    confirm: '확인',
    send: '보내기',
    connect: '연결',
    disconnect: '연결 해제',
    loading: '로딩 중...',
    copy: '복사',
    copied: '복사됨!',
    
    connectWallet: '지갑 연결',
    walletConnected: '지갑 연결됨',
    yourAddress: '내 주소',
    
    chats: '채팅',
    contacts: '연락처',
    settings: '설정',
    
    typeMessage: '메시지를 입력하세요...',
    encryptedMessage: '암호화된 메시지',
    messageDecrypted: '메시지 복호화됨',
    sendEncrypted: '암호화하여 보내기',
    
    addContact: '연락처 추가',
    enterAddress: '지갑 주소 입력',
    contactName: '연락처 이름',
    contactAdded: '연락처가 추가됨',
    
    language: '언어',
    darkMode: '다크 모드',
    encryption: '암호화',
    privateKey: '개인 키',
    publicKey: '공개 키',
    backupKeys: '키 백업',
    
    welcome: '크립토텅에 오신 것을 환영합니다',
    onboardingTitle1: '안전하고 탈중앙화된',
    onboardingDesc1: '메시지는 종단간 암호화되어 탈중앙화된 네트워크에 저장됩니다',
    onboardingTitle2: '블록체인으로 신원 확인',
    onboardingDesc2: '지갑이 당신의 신원입니다 - 사용자 이름이나 비밀번호가 필요 없습니다',
    onboardingTitle3: '완벽한 개인 정보 보호',
    onboardingDesc3: '키는 로컬에 저장됩니다. 우리는 당신의 메시지에 접근할 수 없습니다',
    getStarted: '시작하기',
    next: '다음',
    skip: '건너뛰기',
  }
};

interface LanguageContextType {
  currentLanguage: Language;
  setLanguageByCode: (code: LanguageCode) => void;
  t: (key: string) => string;
  direction: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: languages.en,
  setLanguageByCode: () => {},
  t: () => '',
  direction: 'ltr',
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages.en);

  // Get translation for a key
  const t = (key: string): string => {
    const translationsForLanguage = translations[currentLanguage.code] as Record<string, string>;
    return translationsForLanguage[key] || translations.en[key as keyof typeof translations.en] || key;
  };

  const setLanguageByCode = (code: LanguageCode) => {
    const language = languages[code];
    if (language) {
      setCurrentLanguage(language);
      document.documentElement.setAttribute('lang', code);
      document.documentElement.setAttribute('dir', language.direction);
      localStorage.setItem('preferred-language', code);
      toast({
        title: t('language'),
        description: language.nativeName,
      });
    }
  };

  // Initialize language from localStorage
  useEffect(() => {
    const storedLanguage = localStorage.getItem('preferred-language') as LanguageCode;
    if (storedLanguage && languages[storedLanguage]) {
      setLanguageByCode(storedLanguage);
    } else {
      // Try to detect browser language
      const browserLanguage = navigator.language.split('-')[0] as LanguageCode;
      if (browserLanguage && languages[browserLanguage]) {
        setLanguageByCode(browserLanguage);
      }
    }
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguageByCode,
        t,
        direction: currentLanguage.direction,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
