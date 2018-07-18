import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { UsersProvider } from '../providers/users/users';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { MessageController } from '../utils';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path'
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { PictureProvider } from '../providers/picture/picture';
import { EditPage } from '../pages/edit/edit';
import { PostsProvider } from '../providers/posts/posts';
import { TokenProvider } from '../providers/token/token';
import { PostDetailPage } from '../pages/post-detail/post-detail';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    EditPage,
    PostDetailPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    EditPage,
    PostDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpClient,
    FileTransfer,
    FileTransferObject,
    File,
    FilePath,
    Camera,
    MessageController,
    UsersProvider,
    PictureProvider,
    PostsProvider,
    TokenProvider,
  ]
})
export class AppModule {}
