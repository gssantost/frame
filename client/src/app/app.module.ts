import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { MomentModule } from 'ngx-moment';

import { UsersProvider } from '../providers/users/users';
import { PictureProvider } from '../providers/picture/picture';
import { PostsProvider } from '../providers/posts/posts';
import { TokenProvider } from '../providers/token/token';
import { CommentProvider } from '../providers/comment/comment';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Diagnostic } from '@ionic-native/diagnostic';
import { FilePath } from '@ionic-native/file-path'
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { CameraPreview } from '@ionic-native/camera-preview';

import { ComponentsModule } from '../components/components.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { PostDetailPageModule } from '../pages/post-detail/post-detail.module';
import { EditPageModule } from '../pages/edit/edit.module';
import { LoginPageModule } from '../pages/login/login.module';
import { CommentViewPageModule } from '../pages/comment-view/comment-view.module';
import { LoginPage } from '../pages/login/login';

import { MessageController } from '../utils';
import { LikesProvider } from '../providers/likes/likes';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MomentModule,
    ComponentsModule,
    ProfilePageModule,
    CommentViewPageModule,
    PostDetailPageModule,
    EditPageModule,
    LoginPageModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
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
    Diagnostic,
    Camera,
    CameraPreview,
    MessageController,
    UsersProvider,
    PictureProvider,
    PostsProvider,
    TokenProvider,
    CommentProvider,
    LikesProvider,
  ]
})
export class AppModule {}
