import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { HttpModule } from '@angular/http';
import { environment } from '../environments/environment';
import { Provider } from '@angular/core';
import { AuthService } from './auth.service';


import { AppComponent } from "./app.component";

export const firebaseConfig = {
  apiKey: "AIzaSyAblFffPoJTp4GX3J3NK968hjm9_95PU8k",
  authDomain: "psedu-c19d1.firebaseapp.com",
  databaseURL: "https://psedu-c19d1.firebaseio.com",
  projectId: "psedu-c19d1",
  storageBucket: "psedu-c19d1.appspot.com",
  messagingSenderId: "976897345430"
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
