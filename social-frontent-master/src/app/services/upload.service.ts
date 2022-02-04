import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GLOBAL} from './global';

@Injectable()
export class UploadService {
    public url: string;
    public token: string;
    private baseUrl = 'http://localhost:3800/api/upload'

    constructor(private http: HttpClient) {
        this.url = GLOBAL.url;
    }
    getToken() {
        let token = localStorage.getItem('token');

        if (token != "undefined") {
            this.token = token;
        } else {
            this.token = null;
        }

        return this.token;
    }

    upload(image: any) {
        
        return this.http.post(`${this.baseUrl}`, image)
      }



    makeFileRequest(url: string, params: Array<string>, files: Array<File>, token: string, name: string) {
        return new Promise(function(resolve, reject) {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            for (var i = 0; i < files.length; i++) {
                formData.append(name, files[i], files[i].name);
            }

            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', token);
            xhr.send(formData);
        });
    }
}

