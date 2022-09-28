// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Vuetify

import { createVuetify } from 'vuetify';
import {aliases, fa} from 'vuetify/lib/iconsets/fa';
import {mdi} from 'vuetify/lib/iconsets/mdi';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';


export default createVuetify({
    components,
    directives,
    theme: {
        themes: {
            JLightTheme: {
                dark: false,
                colors: {
                    background: '#e3e4e0',
                    surface: '#FFFFFF',
                    primary: '#5A392D',
                    'primary-darken-1': '#3700B3',
                    secondary: '#4D5A58',
                    'secondary-darken-1': '#018786',
                    accent: '#e3e4e0',
                    error: '#B00020',
                    info: '#2196F3',
                    success: '#4CAF50',
                    warning: '#FB8C00',
                }
            },
        }
    },
    icons: {
        defaults: 'fa',
        aliases,
        sets: { fa, mdi }
      }
});