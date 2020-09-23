import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotelistComponent } from './notelist/notelist.component';
import { NotesComponent } from './notes/notes.component';
import { EditComponent } from './edit/edit.component';
import { environment } from 'src/environments/environment';
import { RegisterComponent } from './home/register/register.component';
import { LoginComponent } from './home/login/login.component';
import { LogComponent } from './home/log/log.component';
import { AuthService } from './home/auth.service';
import { AuthgGuard } from './home/authg.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotelistComponent,
    NotesComponent,
    EditComponent,
    RegisterComponent,
    LoginComponent,
    LogComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService,AuthgGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
