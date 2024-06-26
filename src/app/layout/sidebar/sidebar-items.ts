import { RouteInfo } from './sidebar.metadata';
export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Pannello Principale',
    moduleName: '',
    iconType: '',
    icon: '',
    class: '',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  {
    path: '/dashboard/main',
    title: 'Pannello Principale',
    moduleName: 'dashboard',
    iconType: 'material-icons-two-tone',
    icon: 'home',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  // {
  //   path: 'advance-table',
  //   title: 'Advenec Tables',
  //   moduleName: 'advance-table',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'table_view',
  //   class: '',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   submenu: [],
  // },
  {
    path: '',
    title: 'Servizi',
    moduleName: '',
    iconType: '',
    icon: '',
    class: '',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  // {
  //   path: 'calendar',
  //   title: 'Calendar',
  //   moduleName: 'calendar',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'event_note',
  //   class: '',
  //   groupTitle: false,
  //   badge: 'New',
  //   badgeClass: 'badge bg-blue sidebar-badge float-right',
  //   submenu: [],
  // },
  {
    path: 'task',
    title: 'Elenco',
    moduleName: 'task',
    iconType: 'material-icons-two-tone',
    icon: 'fact_check',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  // {
  //   path: 'contacts',
  //   title: 'Contacts',
  //   moduleName: 'contacts',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'contacts',
  //   class: '',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   submenu: [],
  // },
  // {
  //   path: '',
  //   title: 'Email',
  //   moduleName: 'email',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'email',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   badge: '3',
  //   badgeClass: 'badge bg-orange sidebar-badge float-right',
  //   submenu: [
  //     {
  //       path: '/email/inbox',
  //       title: 'Inbox',
  //       moduleName: 'email',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/email/compose',
  //       title: 'Compose',
  //       moduleName: 'email',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/email/read-mail',
  //       title: 'Read Email',
  //       moduleName: 'email',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //   ],
  // },
  // {
  //   path: '',
  //   title: 'More Apps',
  //   moduleName: 'apps',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'stars',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   submenu: [
  //     {
  //       path: '/apps/chat',
  //       title: 'Chat',
  //       moduleName: 'apps',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/apps/dragdrop',
  //       title: 'Drag & Drop',
  //       moduleName: 'apps',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/apps/contact-grid',
  //       title: 'Contact Grid',
  //       moduleName: 'apps',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/apps/support',
  //       title: 'Support',
  //       moduleName: 'apps',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //   ],
  // },
  // {
  //   path: '',
  //   title: '-- Components',
  //   moduleName: '',
  //   iconType: '',
  //   icon: '',
  //   class: '',
  //   groupTitle: true,
  //   badge: '',
  //   badgeClass: '',
  //   submenu: [],
  // },
  // {
  //   path: '',
  //   title: 'Widgets',
  //   moduleName: 'widget',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'widgets',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   submenu: [
  //     {
  //       path: '/widget/chart-widget',
  //       title: 'Chart Widget',
  //       moduleName: 'widget',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/widget/data-widget',
  //       title: 'Data Widget',
  //       moduleName: 'widget',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //   ],
  // },
  {
    path: '',
    title: 'Donatori',
    moduleName: 'forms',
    iconType: 'material-icons-two-tone',
    icon: 'subtitles',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [
      // {
      //   path: '/forms/form-controls',
      //   title: 'Scheda Donatore',
      //   moduleName: 'forms',
      //   iconType: '',
      //   icon: '',
      //   class: 'ml-menu',
      //   groupTitle: false,
      //   badge: '',
      //   badgeClass: '',
      //   submenu: [],
      // },
      // {
      //   path: '/forms/advance-controls',
      //   title: 'Advanced Controls',
      //   moduleName: 'forms',
      //   iconType: '',
      //   icon: '',
      //   class: 'ml-menu',
      //   groupTitle: false,
      //   badge: '',
      //   badgeClass: '',
      //   submenu: [],
      // },
      {
        path: '/forms/form-example',
        title: 'Scheda Donatore',
        moduleName: 'forms',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
      path: '/forms/nuovo-donatore',
      title: 'Nuovo Donatore',
      moduleName: 'forms',
      iconType: '',
      icon: '',
      class: 'ml-menu',
      groupTitle: false,
      badge: '',
      badgeClass: '',
      submenu: [],
    },
      // {
      //   path: '/forms/form-validation',
      //   title: 'Form Validation',
      //   moduleName: 'forms',
      //   iconType: '',
      //   icon: '',
      //   class: 'ml-menu',
      //   groupTitle: false,
      //   badge: '',
      //   badgeClass: '',
      //   submenu: [],
      // },
      // {
      //   path: '/forms/wizard',
      //   title: 'Form Wizard',
      //   moduleName: 'forms',
      //   iconType: '',
      //   icon: '',
      //   class: 'ml-menu',
      //   groupTitle: false,
      //   badge: '',
      //   badgeClass: '',
      //   submenu: [],
      // },
      // {
      //   path: '/forms/editors',
      //   title: 'Editors',
      //   moduleName: 'forms',
      //   iconType: '',
      //   icon: '',
      //   class: 'ml-menu',
      //   groupTitle: false,
      //   badge: '',
      //   badgeClass: '',
      //   submenu: [],
      // },
    ],
  },
  {
    path: '',
    title: 'Statistiche',
    moduleName: 'tables',
    iconType: 'material-icons-two-tone',
    icon: 'view_list',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [
      {
        path: '/tables/basic-tables',
        title: 'Riepilogo Donazioni',
        moduleName: 'tables',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      // {
      //   path: '/tables/material-tables',
      //   title: 'Material Tables',
      //   moduleName: 'tables',
      //   iconType: '',
      //   icon: '',
      //   class: 'ml-menu',
      //   groupTitle: false,
      //   badge: '',
      //   badgeClass: '',
      //   submenu: [],
      // },
      {
        path: '/tables/nuovo-donatore',
        title: 'Nuovi Donatori',
        moduleName: 'tables',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/widget/statistiche-fidas',
        title: 'Statistiche FIDAS',
        moduleName: 'widget',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
    ],
  },
  // {
  //   path: '',
  //   title: 'User Interface (UI)',
  //   moduleName: 'ui',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'dvr',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   submenu: [
  //     {
  //       path: '/ui/alerts',
  //       title: 'Alerts',
  //       moduleName: 'ui',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/ui/badges',
  //       title: 'Badges',
  //       moduleName: 'ui',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/ui/chips',
  //       title: 'Chips',
  //       moduleName: 'ui',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/ui/modal',
  //       title: 'Modal',
  //       moduleName: 'ui',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/ui/buttons',
  //       title: 'Buttons',
  //       moduleName: 'ui',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/ui/expansion-panel',
  //       title: 'Expansion Panel',
  //       moduleName: 'ui',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/ui/bottom-sheet',
  //       title: 'Bottom Sheet',
  //       moduleName: 'ui',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/ui/dialogs',
  //       title: 'Dialogs',
  //       moduleName: 'ui',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/ui/cards',
  //       title: 'Cards',
  //       moduleName: 'ui',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/ui/labels',
  //       title: 'Labels',
  //       moduleName: 'ui',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/ui/list-group',
  //       title: 'List Group',
  //       moduleName: 'ui',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/ui/media-object',
  //       title: 'Media Object',
  //       moduleName: 'ui',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/ui/snackbar',
  //       title: 'Snackbar',
  //       moduleName: 'ui',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/ui/preloaders',
  //       title: 'Preloaders',
  //       moduleName: 'ui',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/ui/progressbars',
  //       title: 'Progress Bars',
  //       moduleName: 'ui',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/ui/tabs',
  //       title: 'Tabs',
  //       moduleName: 'ui',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/ui/typography',
  //       title: 'Typography',
  //       moduleName: 'ui',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/ui/helper-classes',
  //       title: 'Helper Classes',
  //       moduleName: 'ui',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //   ],
  // },
  // {
  //   path: '',
  //   title: 'Medias',
  //   moduleName: 'media',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'image_search',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   submenu: [
  //     {
  //       path: '/media/gallery',
  //       title: 'Image Gallery',
  //       moduleName: 'media',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //   ],
  // },
  // {
  //   path: '',
  //   title: 'Charts',
  //   moduleName: 'charts',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'insert_chart',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   badge: '5',
  //   badgeClass: 'badge bg-green sidebar-badge float-right',
  //   submenu: [
  //     {
  //       path: '/charts/echart',
  //       title: 'Echart',
  //       moduleName: 'charts',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/charts/apex',
  //       title: 'Apex',
  //       moduleName: 'charts',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/charts/chartjs',
  //       title: 'ChartJS',
  //       moduleName: 'charts',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/charts/ngx-charts',
  //       title: 'Ngx-Charts',
  //       moduleName: 'charts',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/charts/gauge',
  //       title: 'Gauge',
  //       moduleName: 'charts',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //   ],
  // },
  // {
  //   path: '',
  //   title: 'Timeline',
  //   moduleName: 'timeline',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'timeline',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   submenu: [
  //     {
  //       path: '/timeline/timeline1',
  //       title: 'Timeline 1',
  //       moduleName: 'timeline',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/timeline/timeline2',
  //       title: 'Timeline 2',
  //       moduleName: 'timeline',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //   ],
  // },
  // {
  //   path: '',
  //   title: 'Icons',
  //   moduleName: 'icons',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'eco',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   submenu: [
  //     {
  //       path: '/icons/material',
  //       title: 'Material Icons',
  //       moduleName: 'icons',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/icons/font-awesome',
  //       title: 'Font Awesome',
  //       moduleName: 'icons',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //   ],
  // },
  // {
  //   path: '',
  //   title: '-- Pages',
  //   moduleName: '',
  //   iconType: '',
  //   icon: '',
  //   class: '',
  //   groupTitle: true,
  //   badge: '',
  //   badgeClass: '',
  //   submenu: [],
  // },
  // {
  //   path: '',
  //   title: 'Authentication',
  //   moduleName: 'authentication',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'supervised_user_circle',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   submenu: [
  //     {
  //       path: '/authentication/signin',
  //       title: 'Sign In',
  //       moduleName: 'authentication',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/authentication/signup',
  //       title: 'Sign Up',
  //       moduleName: 'authentication',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/authentication/forgot-password',
  //       title: 'Forgot Password',
  //       moduleName: 'authentication',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/authentication/locked',
  //       title: 'Locked',
  //       moduleName: 'authentication',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/authentication/page404',
  //       title: '404 - Not Found',
  //       moduleName: 'authentication',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/authentication/page500',
  //       title: '500 - Server Error',
  //       moduleName: 'authentication',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //   ],
  // },
  // {
  //   path: '',
  //   title: 'Extra Pages',
  //   moduleName: 'extra-pages',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'description',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   submenu: [
  //     {
  //       path: '/extra-pages/profile',
  //       title: 'Profile',
  //       moduleName: 'extra-pages',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/extra-pages/pricing',
  //       title: 'Pricing',
  //       moduleName: 'extra-pages',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/extra-pages/invoice',
  //       title: 'Invoice',
  //       moduleName: 'extra-pages',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/extra-pages/faqs',
  //       title: 'Faqs',
  //       moduleName: 'extra-pages',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/extra-pages/blank',
  //       title: 'Blank Page',
  //       moduleName: 'extra-pages',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //   ],
  // },
  // {
  //   path: '',
  //   title: 'Maps',
  //   moduleName: 'maps',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'map',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   submenu: [
  //     {
  //       path: '/maps/google',
  //       title: 'Google Map',
  //       moduleName: 'maps',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //   ],
  // },
  // {
  //   path: '',
  //   title: 'Multi level Menu',
  //   moduleName: 'multilevel',
  //   iconType: 'material-icons-two-tone',
  //   icon: 'slideshow',
  //   class: 'menu-toggle',
  //   groupTitle: false,
  //   badge: '',
  //   badgeClass: '',
  //   submenu: [
  //     {
  //       path: '/multilevel/first1',
  //       title: 'First',
  //       moduleName: 'multilevel',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //     {
  //       path: '/',
  //       title: 'Second',
  //       moduleName: 'secondlevel',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-sub-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [
  //         {
  //           path: '/multilevel/secondlevel/second1',
  //           title: 'Second 1',
  //           moduleName: 'secondlevel',
  //           iconType: '',
  //           icon: '',
  //           class: '',
  //           groupTitle: false,
  //           badge: '',
  //           badgeClass: '',
  //           submenu: [],
  //         },
  //         {
  //           path: '/multilevel/secondlevel/second2',
  //           title: 'Second 2',
  //           moduleName: 'secondlevel',
  //           iconType: '',
  //           icon: '',
  //           class: '',
  //           groupTitle: false,
  //           badge: '',
  //           badgeClass: '',
  //           submenu: [],
  //         },
  //       ],
  //     },
  //     {
  //       path: '/multilevel/first3',
  //       title: 'Third',
  //       moduleName: 'multilevel',
  //       iconType: '',
  //       icon: '',
  //       class: 'ml-menu',
  //       groupTitle: false,
  //       badge: '',
  //       badgeClass: '',
  //       submenu: [],
  //     },
  //   ],
  // },
];
