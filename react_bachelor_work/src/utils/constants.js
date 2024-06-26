import { Link } from "react-router-dom";

export const paths_data1 = {
    '/about': 'Про фонд',
    '/staff': 'Склад фонду'
};

export const paths_data2 = {
    '/notices': 'Оголошення',
    '/fundraisings': 'Збори'
};

export const paths_data3 = {
    '/results': 'Звіти',
    '/contacts': 'Контакти',
    '/faq': 'FAQ'
};

export const ADMIN_ROUTE = '/admin';
export const USER_ROUTE = '/user';
export const LANDING_ROUTE = '/';
export const ABOUT_ROUTE = '/about';
export const STAFF_ROUTE = '/staff';
export const FUNDRAISINGS_ROUTE = '/fundraisings';
export const NOTICES_ROUTE = '/notices';
export const RESULTS_ROUTE = '/results';
export const CONTACTS_ROUTE = '/contacts';
export const FAQ_ROUTE = '/faq';
export const LOGIN_ROUTE = '/login';
export const SIGNUP_ROUTE = '/signup';
export const CONFIRM_ROUTE = '/confirm/:token';
export const FORGOT_ROUTE = '/forgotPassword';
export const RESET_ROUTE = '/resetPassword/:token';

export const members = {
    "Андрій Топоров": "Голова благодійного фонду.",
    "Валерій Грищук": "Перший заступник голови.",
    "Павло Пилипчук": "Адміністратор."
}    

export const questions = [
    {
        question: 'Як можу долучитися до благодійної діяльності фонду для підтримки українських військових?',
        answer: <p>Щоб долучитися до благодійної діяльності фонду, ви можете здійснити 
        фінансовий внесок через наш веб-сайт, або запропонувати матеріальну допомогу, або долучитися до нашого фонду як волонтер.</p>
    },
    {
        question: 'Які проекти з підтримки Збройних Сил України фінансує ваш фонд?',
        answer: <p>Наш фонд фінансує різноманітні проекти, спрямовані на поліпшення умов життя та підтримку військовослужбовців України,
         включно з постачанням необхідного обладнання та техніки, медичну допомогу та соціальну підтримку.</p>
    },
    {
        question: 'Чи можу я підтримати конкретний проєкт або військову частину для надання допомоги?',
        answer: <p>Так, ви можете підтримати конкретний проєкт або військову частину, зробивши фінансовий внесок
         або надавши матеріальну допомогу.</p>
    },
    {
        question: 'Які матеріальні потреби є найбільш актуальними для військових зараз?',
        answer: <p>Актуальні матеріальні потреби військових можуть змінюватися з часом, але зазвичай вони включають у себе необхідне обладнання,
         засоби захисту, медичні препарати та інші засоби, необхідні для ведення бойових дій та підтримки умов життя.</p>
    },
    {
        question: 'Чи існує можливість надавати гуманітарну допомогу мирному населенню в зоні конфлікту?',
        answer: <p>Так, наш фонд також здійснює гуманітарну допомогу мирному населенню в зоні конфлікту, 
        надаючи необхідні засоби і матеріальні блага для полегшення їхнього становища.</p>
    },
    {
        question: 'Чи приймаєте ви волонтерів для роботи безпосередньо на передовій?',
        answer: <p>Наш фонд не організовує безпосередньо роботу на передовій, проте ми співпрацюємо з партнерами та волонтерськими організаціями, 
        які можуть надати інформацію про можливості волонтерської діяльності.</p>
    },
    {
        question: 'Які ще способи допомоги можуть бути корисними, окрім фінансових внесків?',
        answer: <p>Окрім фінансових внесків, допомогу можна надати шляхом розповсюдження інформації про нашу діяльність, мобілізації ресурсів
         та матеріальної допомоги, а також участі у наших заходах та акціях.</p>
    },
    {
        question: 'Які гарантії того, що моя допомога буде використана ефективно і прозоро?',
        answer: <p>Наш фонд забезпечує <Link to={RESULTS_ROUTE} >прозорий звіт</Link> про використання фінансових коштів, де кожен внесок чітко відображається 
            у відповідних програмах та проєктах. Ми також забезпечуємо звіти та зворотний зв'язок щодо результатів нашої діяльності.</p>
    }
];

export const media_paths = {
    'fab fa-youtube': 'https://www.youtube.com/channel/UCya7l0Wl8SqlLCl5Jh3J04A',
    'fab fa-telegram': 'https://t.me/ndrtprv',
    'fab fa-linkedin': 'https://www.linkedin.com/in/andrii-toporov-465829264/',
    'fab fa-github': 'https://github.com/ndrtprv'
};

export const button_paths = ['/login', '/signup'];