import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotelistComponent } from './notelist/notelist.component';
import { NotesComponent } from './notes/notes.component';
import { EditComponent } from './edit/edit.component';
import { RegisterComponent } from './home/register/register.component';
import { LogComponent } from './home/log/log.component';
import { AuthgGuard } from './home/authg.guard';

const routes: Routes = [
  {path : 'notelist', component : NotelistComponent,canActivate: [AuthgGuard]},
  {path : 'notes', component : NotesComponent, canActivate: [AuthgGuard], data: {roles: ["admin"]} },
  {path : 'edit', component : EditComponent, canActivate: [AuthgGuard], data: {roles: ["admin"]}},
  {path : 'register', component : RegisterComponent},
  {path : 'logout', component : LogComponent},
  {path : '', component : HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

