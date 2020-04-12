import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Card } from 'src/assets/classes/card';
import * as firebase from 'firebase';
import { Profile } from 'src/assets/classes/profile';
import { Friend } from 'src/assets/classes/friend';
import { Game } from 'src/assets/classes/game';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SimpleCard } from 'src/assets/classes/simpleCard';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private afs: AngularFirestore, private http: HttpClient) { }

  public async GetNickname(userId: string): Promise<string> {
    return this.afs.firestore.doc('profiles/' + userId).get().then(r => {
      return r.data().nickname as string;
    });
  }

  public async GetFriends(userId: string): Promise<Friend[]> {
    return this.afs.firestore.collection('profiles/' + userId + '/friends').get().then(r => {
      return r.docs.map(d => {
          const data = d.data();
          const id = d.id;
          return { id, ...(data as {}) } as Friend;
      });
    });
  }

  public async AddFriend(nickname: string, myUserId: string, myNickname: string): Promise<boolean> {
    return this.afs.firestore.collection('profiles').where('nickname', '==', nickname).get().then(r => {
      const users = r.docs.map(d => {
          const data = d.data();
          const id = d.id;
          return { id, ...(data as {}) } as Profile;
      });

      if (users.length === 0) {
        return false;
      }

      this.afs.firestore.collection('profiles/' + myUserId + '/friends').add({
        date: new firebase.firestore.Timestamp(Math.floor(Date.now() / 1000), 0),
        friendName: users[0].nickname,
        friendId: users[0].id,
      });
      this.afs.firestore.collection('profiles/' + users[0].id + '/friends').add({
        date: new firebase.firestore.Timestamp(Math.floor(Date.now() / 1000), 0),
        friendName: myNickname,
        friendId: myUserId,
      });
      return true;
    });
  }

  public async GetBlackCards(): Promise<Card[]> {
    return this.afs.firestore.collection('black-cards').get().then(r => {
      return r.docs.map(d => {
          const data = d.data();
          const id = d.id;
          return { id, ...(data as {}) } as Card;
      });
    });
  }

  public async GetWhiteCards(): Promise<Card[]> {
    return this.afs.firestore.collection('white-cards').get().then(r => {
      return r.docs.map(d => {
          const data = d.data();
          const id = d.id;
          return { id, ...(data as {}) } as Card;
      });
    });
  }

  public async AddBlackCard(text: string, nickname: string, userId: string) {
    this.afs.firestore.collection('black-cards').add({
      creationdate: new firebase.firestore.Timestamp(Math.floor(Date.now() / 1000), 0),
      creator: nickname,
      creatorId: userId,
      text
    });
  }

  public async UpdateBlackCard(id: string, text: string) {
    this.afs.firestore.doc('black-cards/' + id).update({
      text
    });
  }

  public async AddWhiteCard(text: string, nickname: string, userId: string) {
    this.afs.firestore.collection('white-cards').add({
      creationdate: new firebase.firestore.Timestamp(Math.floor(Date.now() / 1000), 0),
      creator: nickname,
      creatorId: userId,
      text
    });
  }

  public async UpdateWhiteCard(id: string, text: string) {
    this.afs.firestore.doc('white-cards/' + id).update({
      text
    });
  }

  public async AddGame(data: Game) {
    const res = await this.afs.firestore.collection('games').add({
      creationdate: data.creationdate,
      creatorId: data.creatorId,
      creatorName: data.creatorName,
      currounds: data.currrounds,
      finished: data.finished,
      maxrounds: data.maxrounds,
      name: data.name,
      provisioned: data.provisioned,
      scoreboard: data.scoreboard,
      playerIds: data.playerIds
    });
    this.http.get('https://us-central1-cardsagainsthumanity-22112.cloudfunctions.net/provisionGameHttp?id=' + res.id).subscribe(r => {
      console.dir(r);
    });
    return res.id;
  }

  public async GetGames(userId: string): Promise<Game[]> {
    return this.afs.firestore.collection('games').where('playerIds', 'array-contains', userId).get().then(r => {
      return r.docs.map(d => {
          const data = d.data();
          const id = d.id;
          return { id, ...(data as {}) } as Game;
      });
    });
  }

  public SetMyCheckin(userId: string, gameId: string) {
    const obj = {};
    obj[userId] = Date.now();
    this.afs.firestore.doc('games/' + gameId + '/checkins/checkins').update(obj);

    return this.afs.doc('games/' + gameId + '/checkins/checkins').snapshotChanges();
  }

  public async GetDeck(userId: string, gameId: string): Promise<SimpleCard[]> {
    return this.afs.firestore.doc('games/' + gameId + '/decks/' + userId).get().then(r => {
      return r.data().cards as SimpleCard[];
    });
  }

  public async GetCurrentBlackCard(gameId: string): Promise<SimpleCard> {
    return this.http.get<SimpleCard>('https://us-central1-cardsagainsthumanity-22112.cloudfunctions.net/getBlackCard?gameId=' + gameId)
    .toPromise().then(r => {
      return r;
    });
  }

}
