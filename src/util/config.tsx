import { history } from '../App';
import axios from "axios"
const TOKEN_CYBER = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyZWQiOiIyLzQvMjA0NiAzOjE2OjM4IFBNIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImI5Mzc2NDk3LTE2NzgtNDJlMC1iOGY4LWQ1Y2NhYTAzMjc0ZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJDX0tIIiwiQU5ZIiwiQ19MTCIsIkNfTE9QIiwiQ19ORCIsIkNIRUNLX01FTlRPUl9MT1AiLCJEX0RBTkgiLCJEX0tIIiwiRF9MTCIsIkRfTkQiLCJGX0dDIiwiRl9MT1AiLCJHRF9MSCIsIktfVFQiLCJOX1FVWUVOIiwiUUxfQkwiLCJRTF9CTSIsIlFMX0NMIiwiUUxfR0MiLCJRTF9ITVQiLCJRTF9LSCIsIlFMX0xUIiwiUUxfVFQiLCJSX0JIIiwiUl9LSCIsIlJfTEwiLCJSX0xPUCIsIlJfTkQiLCJSX1ZMIiwiVV9LSCIsIlVfTEwiLCJVX0xPUCIsIlVfTkQiLCJYX0tIX0wiLCJRTF9MQ04iLCJRTF9US0QiLCJRTF9DSFRMIiwiUUxfUk0iLCJEX0JUIiwiS19DSEVDS19MIiwiUUxfQ0NOIiwiUUxfS0tIViIsIlVfTkdBWV9CSCIsIlFMX0NPTkZJRyJdLCJuYmYiOjE2NzU0OTg1OTgsImV4cCI6MTY3NTUwMjE5OH0.qDwGahgmxsJyfRjjpEUJk3i-fjLHKTCEOs3VKhTMVyo'

export const DOMAIN: string = 'https://jiranew.cybersoft.edu.vn'
export const ACCESS_TOKEN: string = "accessToken"
export const USER_LOGIN: string = "userLogin"
export const USER_PROFILE: string = "userProfile"
export const http = axios.create({
    baseURL: DOMAIN,
    timeout: 30000,
});
http.interceptors.request.use((response:any) => {
    response.headers = {
        ...response.headers,
        Authorization: `Bearer ${settings.getStore(ACCESS_TOKEN)}`,
        TokenCybersoft: TOKEN_CYBER,
    };
    return response
}, (error:any) => {
    return Promise.reject(error)
})
http.interceptors.response.use(
    (result) => {
        return result;
    },
    (error) => {
        // if (error.response?.status === 400 || error.response?.status === 404) { history.push("/") }
        // if (error.response?.status === 401 || error.response?.status === 403) {
        //     const isMyTokenExpired = isExpired(settings.getStore(ACCESS_TOKEN));
        //     if (isMyTokenExpired) {
        //         alert("Hết phiên đăng nhập yêu cầu đăng nhập lại !");
        //         settings.clearStorage(ACCESS_TOKEN);
        //         settings.clearStorage(USER_LOGIN);
        //         window.location.href = "/login";
        //     }
        //     history.push("/login");
        // }
        // return Promise.reject(error)
    }
)

export const settings = {
    setStorageJson: (name: string, data: any): void => {
        data = JSON.stringify(data);
        localStorage.setItem(name, data);
    },
    setStorage: (name: string, data: string): void => {
        localStorage.setItem(name, data)
    },
    getStorageJson: (name: string): any | undefined => {
        if (localStorage.getItem(name)) {
            const dataStore: string | undefined | null = localStorage.getItem(name);
            if (typeof dataStore == 'string') {
                const data = JSON.parse(dataStore);
                return data;
            }
            return undefined;
        }
        return;
    },
    getStore: (name: string): string | null | undefined | boolean | any => {
        if (localStorage.getItem(name)) {
            const data: string | null | undefined = localStorage.getItem(name);
            return data;
        }
        return;
    },
    setCookieJson: (name: string, value: any, days: number): void => {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        value = JSON.stringify(value);
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },
    getCookieJson: (name: string): any => {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return JSON.parse(c.substring(nameEQ.length, c.length));
        }
        return null;
    },
    setCookie: (name: string, value: string, days: number): void => {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },
    getCookie: (name: string): string | null => {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    eraseCookie: (name: string): void => {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    },
    clearStorage: (name: string) => {
        localStorage.removeItem(name);
    }

}