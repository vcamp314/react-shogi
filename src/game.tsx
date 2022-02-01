import React from 'react';
import './index.css';
import {Setting} from "./setting";
import {Piece} from './pieces/piece';
import { Pawn } from "./pieces/pawn";
import { Lance } from "./pieces/lance";
import { Knight } from "./pieces/knight";
import { Silver } from "./pieces/silver";
import { Gold } from "./pieces/gold";
import { Bishop } from "./pieces/bishop";
import { Rook } from "./pieces/rook";
import { King } from "./pieces/king";
import { Mt } from "./pieces/mt";
import {Board, Captured} from './board';
import _ from 'lodash';
import Confirm from './material/confirm'
import Alert from './material/alert'
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIosSharp';
import Replay10OutlinedIcon from '@material-ui/icons/Replay10Outlined';
import Forward10OutlinedIcon from '@material-ui/icons/Forward10Outlined';

export function make_board(sfen="lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1", language='Ja'): Piece[][]{
  let squares: Piece[][] = [];
  for(let i = 0; i < Setting.LENGTH; ++i){
    squares[i] = [];
    for(let j = 0; j < Setting.LENGTH; ++j){
      squares[i].push(new Mt());
    }
  }
  if(sfen === "lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1"){
    for(let i = 0; i < Setting.LENGTH; ++i){
      squares[i][2] = new Pawn(false);
      squares[i][6] = new Pawn(true);
    }
    squares[0][0] = new Lance(false);
    squares[8][0] = new Lance(false);
    squares[0][8] = new Lance(true);
    squares[8][8] = new Lance(true);

    squares[1][0] = new Knight(false);
    squares[7][0] = new Knight(false);
    squares[1][8] = new Knight(true);
    squares[7][8] = new Knight(true);

    squares[2][0] = new Silver(false);
    squares[6][0] = new Silver(false);
    squares[2][8] = new Silver(true);
    squares[6][8] = new Silver(true);

    squares[3][0] = new Gold(false);
    squares[5][0] = new Gold(false);
    squares[3][8] = new Gold(true);
    squares[5][8] = new Gold(true);

    squares[1][1] = new Bishop(false);
    squares[7][7] = new Bishop(true);

    squares[7][1] = new Rook(false);
    squares[1][7] = new Rook(true);

    squares[4][0] = new King(false);
    squares[4][8] = new King(true);
  }
  else{

  }
  return squares;
}

export function set_piece(n: number, is_black: boolean): Piece{
  let piece: Piece = new Mt();
  if(n === 0) piece = new Rook(is_black);
  if(n === 1) piece = new Bishop(is_black);
  if(n === 2) piece = new Gold(is_black);
  if(n === 3) piece = new Silver(is_black);
  if(n === 4) piece = new Knight(is_black);
  if(n === 5) piece = new Lance(is_black);
  if(n === 6) piece = new Pawn(is_black);
  return piece;
}

export function set_pieces(): number[]{
  let numbers: number[] = new Array<number>(Setting.WHITE).fill(0);
  return numbers;
}

export function set_kifu(): Array<number>{
  let kifu: Array<number> = [];
  return kifu;
}

export function set_control_piece(flag: boolean = false): boolean[][]{
  let control_piece: boolean[][] = [];
  for(let i = 0; i < Setting.LENGTH; ++i){
    control_piece[i] = new Array<boolean>(Setting.LENGTH).fill(flag);
  }
  return control_piece;
}

// ある駒の利きを列挙
// 手番の駒のマスは移動するときにはじいているため、ここではそのマスも利きに入れてしまう
// ただし飛び道具はすり抜けしないために正しい効きを列挙する
function control_pos_sub(control_pos: number[][], pos: Piece[][], turn: boolean, x: number, y: number, kingx: number = -1, kingy: number = -1, check_king: boolean = true): void{
  let num: number = pos[x][y].piece_num();
  // 歩
  if(num === 6){
    if(turn ? y !== 0 : y !== Setting.LENGTH - 1){
      let yy = (turn ? y - 1 : y + 1);
      ++control_pos[x][yy];
      // 王手をしているか
      if(x === kingx && yy === kingy){
        control_pos[Setting.LENGTH][0] = x * Setting.LENGTH + y;
        control_pos[Setting.LENGTH][1] = num;
      }
    }
    return;
  }
  if(num === 2 || num === 3 || num === 4 || num === 7 || (11 <= num && num <= 14)){
    let dx: number[];
    let dy: number[];
    // 桂
    if(num === 4){
      dx = new Array<number>(-1, 1);
      dy = new Array<number>(-2, -2);
    }
    // 銀
    else if(num === 3){
      dx = new Array<number>(-1, 0, 1, 1, -1);
      dy = new Array<number>(-1, -1, -1, 1, 1);
    }
    // 金、と、杏、圭、全
    else if(num === 2 || (11 <= num && num <= 14)){
      dx = new Array<number>(-1, 0, 1, 1, 0, -1);
      dy = new Array<number>(-1, -1, -1, 0, 1, 0);
    }
    // 玉
    else{
      if(check_king){
        dx = new Array<number>(-1, 0, 1, 1, 1, 0, -1, -1);
        dy = new Array<number>(-1, -1, -1, 0, 1, 1, 1, 0);
      }
      else{
        dx = new Array<number>(0);
        dy = new Array<number>(0);
      }
    }
    for(let i = 0; i< dx.length; ++i){
      let xx = (turn ? x + dx[i] : x - dx[i]);
      let yy = (turn ? y + dy[i] : y - dy[i]);
      if(0 <= xx && xx < Setting.LENGTH && 0 <= yy && yy < Setting.LENGTH){
        ++control_pos[xx][yy];
        // 王手をしているか
        if(xx === kingx && yy === kingy){
          control_pos[Setting.LENGTH][0] = x * Setting.LENGTH + y;
          control_pos[Setting.LENGTH][1] = num;
        }
      }
    }
    return;
  }
  // 香
  if(num === 5){
    let dy: number = -1;
    let yy = (turn ? y + dy : y - dy);
    while(0 <= yy && yy < Setting.LENGTH){
      ++control_pos[x][yy];
      // 王手をしているか
      if(x === kingx && yy === kingy){
        control_pos[Setting.LENGTH][0] = x * Setting.LENGTH + y;
        control_pos[Setting.LENGTH][1] = num;
      }
      // 空きマスでなければ終わり
      // ただし相手玉なら終わらない
      if(pos[x][yy].piece_num() !== Setting.MT && !(pos[x][yy].piece_num() === 7 && pos[x][yy].turn() !== turn)){
        break;
      }
      yy = (turn ? yy + dy : yy - dy);
    }
    return;
  }
  // 飛と角は手番で動きが変わらない！（対称）
  // 角
  if(num === 1 || num === 9){
    let dx: number[] = new Array<number>(-1, 1, 1, -1);
    let dy: number[] = new Array<number>(-1, -1, 1, 1);
    for(let i = 0; i < dx.length; ++i){
      let xx = x + dx[i];
      let yy = y + dy[i];
      while(0 <= xx && xx < Setting.LENGTH && 0 <= yy && yy < Setting.LENGTH){
        ++control_pos[xx][yy];
        // 王手をしているか
        if(xx === kingx && yy === kingy){
          control_pos[Setting.LENGTH][0] = x * Setting.LENGTH + y;
          control_pos[Setting.LENGTH][1] = num;
        }
        // 空きマスでなければ終わり
        // ただし相手玉なら終わらない
        if(pos[xx][yy].piece_num() !== Setting.MT && !(pos[xx][yy].piece_num() === 7 && pos[xx][yy].turn() !== turn)){
          break;
        }
        xx += dx[i];
        yy += dy[i];
      }
    }
    // 馬の場合は上下左右も
    if(num === 9){
      dx = new Array<number>(0, 1, 0, -1);
      dy = new Array<number>(-1, 0, 1, 0);
      for(let i = 0; i< dx.length; ++i){
        let xx = x + dx[i];
        let yy = y + dy[i];
        if(0 <= xx && xx < Setting.LENGTH && 0 <= yy && yy < Setting.LENGTH){
          ++control_pos[xx][yy];
          // 王手をしているか
          if(xx === kingx && yy === kingy){
            control_pos[Setting.LENGTH][0] = x * Setting.LENGTH + y;
            control_pos[Setting.LENGTH][1] = num;
          }
        }
      }
    }
    return;
  }
  // 飛
  if(num === 0 || num === 8){
    let dx: number[] = new Array<number>(0, 1, 0, -1);
    let dy: number[] = new Array<number>(-1, 0, 1, 0);
    for(let i = 0; i < dx.length; ++i){
      let xx = x + dx[i];
      let yy = y + dy[i];
      while(0 <= xx && xx < Setting.LENGTH && 0 <= yy && yy < Setting.LENGTH){
        ++control_pos[xx][yy];
        // 王手をしているか
        if(xx === kingx && yy === kingy){
          control_pos[Setting.LENGTH][0] = x * Setting.LENGTH + y;
          control_pos[Setting.LENGTH][1] = num;
        }
        // 空きマスでなければ終わり
        // ただし相手玉なら終わらない
        if(pos[xx][yy].piece_num() !== Setting.MT && !(pos[xx][yy].piece_num() === 7 && pos[xx][yy].turn() !== turn)){
          break;
        }
        xx += dx[i];
        yy += dy[i];
      }
    }
    // 竜の場合は斜めも
    if(num === 8){
      dx = new Array<number>(-1, 1, 1, -1);
      dy = new Array<number>(-1, -1, 1, 1);
      for(let i = 0; i< dx.length; ++i){
        let xx = x + dx[i];
        let yy = y + dy[i];
        if(0 <= xx && xx < Setting.LENGTH && 0 <= yy && yy < Setting.LENGTH){
          ++control_pos[xx][yy];
          // 王手をしているか
          if(xx === kingx && yy === kingy){
            control_pos[Setting.LENGTH][0] = x * Setting.LENGTH + y;
            control_pos[Setting.LENGTH][1] = num;
          }
        }
      }
    }
    return;
  }
}

// 駒の利きを列挙
// 一つの駒を指定することもできる
// ついでに王手をかけている駒の位置も返す
function control_pos(pos: Piece[][], turn: boolean, x: number = -1, y: number = -1, kingx: number = -1, kingy: number = -1, check_king: boolean = true): number[][]{
  let control_pos: number[][] = [];
  for(let i = 0; i < Setting.LENGTH + 1; ++i){
    control_pos[i] = new Array<number>(Setting.LENGTH).fill(0);
  }
  if(x !== -1){
    control_pos_sub(control_pos, pos, turn, x, y);
    return control_pos;
  }
  for(let i = 0; i < Setting.LENGTH; ++i){
    for(let j = 0; j < Setting.LENGTH; ++j){
      if(pos[i][j].piece_num() !== Setting.MT && pos[i][j].turn() === turn){
        control_pos_sub(control_pos, pos, turn, i, j, kingx, kingy, check_king);
      }
    }
  }
  return control_pos;
}

// 王手がかかっているか
function check(pos: Piece[][], turn: boolean, x: number = -1, y : number = -1): boolean{
  // 玉の位置
  if(x === -1){
    for(let i = 0; i < Setting.LENGTH; ++i){
      for(let j = 0; j < Setting.LENGTH; ++j){
        if(pos[i][j].piece_num() === 7 && pos[i][j].turn() === turn){
          x = i;
          y = j;
          i = Setting.LENGTH;
          j = Setting.LENGTH;
          break;
        }
      }
    }
  }
  // 効いているマス
  let atc_controls: number[][] = control_pos(pos, !turn, -1, -1, x, y);
  // 王手をかけている駒の数
  let cnt: number = atc_controls[x][y];
  return cnt > 0;
}

// 詰んでいるか
function mate(pos: Piece[][], captured: number[], turn: boolean): boolean{
  let tmp_pos = _.cloneDeep(pos);
  // 玉の位置
  let x: number = -1;
  let y: number = -1;
  for(let i = 0; i < Setting.LENGTH; ++i){
    for(let j = 0; j < Setting.LENGTH; ++j){
      if(tmp_pos[i][j].piece_num() === 7 && tmp_pos[i][j].turn() === turn){
        x = i;
        y = j;
        i = Setting.LENGTH;
        j = Setting.LENGTH;
        break;
      }
    }
  }
  // 効いているマス
  let atc_controls: number[][] = control_pos(tmp_pos, !turn, -1, -1, x, y);
  // 王手をかけている駒の数
  let cnt: number = atc_controls[x][y];
  // 王手されていなければ明らかに詰んでいない
  if(cnt === 0){
    return false;
  }
  // 今いるマス及び周りのマスで王手がかかるか
  // 玉自身で王手をかけている駒を取る場合を含む
  let dx: number[] = new Array<number>(1, 1, 0, -1, -1, -1, 0, 1);
  let dy: number[] = new Array<number>(0, 1, 1, 1, 0, -1, -1, -1);
  for(let i = 0; i < dx.length; ++i){
    let xx = x + dx[i];
    let yy = y + dy[i];
    if(xx < 0 || Setting.LENGTH <= xx || yy < 0 || Setting.LENGTH <= yy){
      continue;
    }
    // 自分の駒があるとダメ
    if(tmp_pos[xx][yy].piece_num() !== Setting.MT && tmp_pos[xx][yy].turn() === turn){
      continue;
    }
    // 逃げられるマスがあれば詰んでいない
    if(atc_controls[xx][yy] === 0){
      return false;
    }
  }
  // 2つ以上の駒から王手されている場合は逃げられなければ明らかにダメ
  if(cnt > 1){
    return true;
  }
  // 王手をかけている駒の位置
  const atc = atc_controls[Setting.LENGTH][0];
  const atcx: number = Math.floor(atc / Setting.LENGTH);
  const atcy: number = atc % Setting.LENGTH;
  // 王手をかけている駒の種類
  const num: number = atc_controls[Setting.LENGTH][1];
  const piece = tmp_pos[atcx][atcy];
  // 1. 王手をかけている駒を（玉以外で）取れるか
  // 玉で取れる場合はここではチェックしなくてよい
  // 2. 桂馬以外の飛び道具で王手されているとき合い駒できるか
  for(let i = 0; i < Setting.LENGTH; ++i){
    for(let j = 0; j < Setting.LENGTH; ++j){
      // 自分の駒かチェック
      if(tmp_pos[i][j].turn() !== turn || tmp_pos[i][j].piece_num() === Setting.MT || tmp_pos[i][j].piece_num() === 7){
        continue;
      }
      const tmp_controls = control_pos(tmp_pos, turn, i, j);
      // 1.
      if(tmp_controls[atcx][atcy]){
        // 取ったときに王手がかかっていなければ詰んでいない
        tmp_pos[atcx][atcy] = tmp_pos[i][j];
        tmp_pos[i][j]=new Mt();
        if(!check(tmp_pos, turn, x, y)){
          return false;
        }
        tmp_pos[i][j] = tmp_pos[atcx][atcy];
        tmp_pos[atcx][atcy] = piece;
      }
      // 2.
      if(num === 0 || num === 1 || num === 5 || num === 8 || num === 9){
        let dx: number = atcx - x;
        let dy: number = atcy - y;
        if(dx !== 0){
          dx /= Math.abs(dx);
        }
        if(dy !== 0){
          dy /= Math.abs(dy);
        }
        let xx: number = x + dx;
        let yy: number = y + dy;
        while(xx !== atcx || yy !== atcy){
          // 移動合いできるか
          if(tmp_controls[xx][yy] > 0){
            tmp_pos[xx][yy] = tmp_pos[i][j];
            tmp_pos[i][j]=new Mt();
            // 王手がかかっていなければ詰んでいない
            if(!check(tmp_pos, turn, x, y)){
              return false;
            }
            tmp_pos[i][j] = tmp_pos[xx][yy];
            // 駒があるところだと合い駒できないため、tmp_pos[xx][yy]は必ずMtである
            tmp_pos[xx][yy] = new Mt();
          }
          xx += dx;
          yy += dy;
        }
      }
    }
  }
  // 持ち駒を使って合い駒できるか
  if(num === 0 || num === 1 || num === 5 || num === 8 || num === 9){
    let dx: number = atcx - x;
    let dy: number = atcy - y;
    if(dx !== 0){
      dx /= Math.abs(dx);
    }
    if(dy !== 0){
      dy /= Math.abs(dy);
    }
    let xx: number = x + dx;
    let yy: number = y + dy;
    while(xx !== atcx || yy !== atcy){
      // 持ち駒で合い駒できるか
      for(let i = 0; i < Setting.WHITE; ++i){
        if(captured[i] === 0){
          continue;
        }
        tmp_pos[xx][yy] = set_piece(i, turn);
        if(can_move(pos, tmp_pos, captured, -1, -1, xx, yy, turn)){
          // 二歩かどうかはチェックする必要がある
          if(i === 6 && nifu(tmp_pos, xx, turn)){
            tmp_pos[xx][yy] = new Mt();
            continue;
          }
          return false;
        }
        tmp_pos[xx][yy] = new Mt();
      }
      xx += dx;
      yy += dy;
    }
  }

  return true;
}

// 動けるマスか
// 動かす前の盤面、動かした後の盤面、移動前の位置、移動後の位置、手番
function can_move(bfr_pos: Piece[][], cur_pos: Piece[][], captured: number[], xx: number, yy: number, x: number, y: number, turn: boolean): boolean{
  let num: number = cur_pos[x][y].piece_num();
  // 駒を打つときは行き所がないかと、打ち歩詰めのみをチェックすればよい
  // 二歩は別でチェックする
  if(xx === -1){
    if(num === 4){
      return (turn ? y > 1 : y < Setting.LENGTH - 1 - 1);
    }
    if(num === 5){
      return (turn ? y !== 0 : y !== Setting.LENGTH - 1);
    }
    if(num === 6){
      if((turn ? y === 0 : y === Setting.LENGTH - 1)){
        return false;
      }
      // 打ち歩詰めかどうか
      return !mate(cur_pos, captured, !turn);
    }
    return true;
  }
  // ルール通りの動きか調べる
  // 香、角、飛は駒をすり抜けに注意
  let controls: number[][] = control_pos(bfr_pos, turn, xx, yy);
  return controls[x][y] > 0;
}

// 二歩かどうか
// 打った筋だけ見ればよい
function nifu(pos: Piece[][], x: number, turn: boolean): boolean{
  let cnt = 0;
  for(let i = 0; i < Setting.LENGTH; ++i){
    if(pos[x][i].piece_num() === 6 && pos[x][i].turn() === turn){
      ++cnt;
    }
  }
  return cnt >= 2;
}

interface IGameProps {
  start_pos: Piece[][];
  start_black_piece: number[];
  start_white_piece: number[];
  current_pos: Piece[][];
  current_black_piece: number[];
  current_white_piece: number[];
  control_piece: boolean[][];
  kifu: Array<number>;
  turn: boolean;
  moves: number;
  moves_sub: number;
  moves_max: number;
  clicked_piece: number;
  final_piece: number;
  black_name: string;
  white_name: string;
  is_black: boolean;
  moved_piece: number;
  promotion: boolean;
  resign: boolean;
  result: boolean;
  is_mobile: boolean;
  is_online: boolean;
}

interface IGameState {
  // 開始局面
  start_pos: Piece[][];
  start_black_piece: number[];
  start_white_piece: number[];
  // 現局面
  current_pos: Piece[][];
  current_black_piece: number[];
  current_white_piece: number[];
  // 指し手の候補
  control_piece: boolean[][];
  // 棋譜
  kifu: Array<number>;
  // 先手番かどうか
  turn: boolean;
  // 手数
  moves: number;
  // 表示用の手数
  moves_sub: number;
  // 終局時の手数
  moves_max: number;
  // 掴んでいる駒
  clicked_piece: number;
  // 最後に動かした駒
  final_piece: number;
  // 先手の名前
  black_name: string;
  // 後手の名前
  white_name: string;
  // 自分が先手かどうか
  is_black: boolean;
  // 駒を成るときに使う移動先
  moved_piece: number;
  promotion: boolean;
  // 投了メッセージを表示するか
  resign: boolean;
  // 結果メッセージ
  result: boolean;
  // スマホかどうか
  is_mobile: boolean;
  is_online: boolean;
}

export class Game extends React.Component<IGameProps, IGameState> {
  constructor(props: IGameProps){
    super(props);
    this.state = {
      start_pos: this.props.start_pos,
      start_black_piece: this.props.start_black_piece,
      start_white_piece: this.props.start_white_piece,
      current_pos: this.props.current_pos,
      current_black_piece: this.props.current_black_piece,
      current_white_piece: this.props.current_white_piece,
      control_piece: this.props.control_piece,
      kifu: this.props.kifu,
      turn: this.props.turn,
      moves: this.props.moves,
      moves_sub: this.props.moves_sub,
      moves_max: this.props.moves_max,
      clicked_piece: this.props.clicked_piece,
      final_piece: this.props.final_piece,
      black_name: this.props.black_name,
      white_name: this.props.white_name,
      is_black: this.props.is_black,
      moved_piece: this.props.moves,
      promotion: this.props.promotion,
      resign: this.props.resign,
      result: this.props.result,
      is_mobile: this.props.is_mobile,
      is_online: this.props.is_online,
    };
    this.handlePromotion = this.handlePromotion.bind(this);
    this.handleResign= this.handleResign.bind(this);
    this.handleResultClose = this.handleResultClose.bind(this);
  }

  handleClick(i: number){
    if(this.state.moves < 0){
      return;
    }
    let clicked_piece: number = this.state.clicked_piece;
    const turn = this.state.turn;
    const is_online = this.state.is_online;
    let tmp_pos = _.cloneDeep(this.state.current_pos);  // 動かした後の盤面
    const current_black_piece = _.cloneDeep(this.state.current_black_piece);
    const current_white_piece = _.cloneDeep(this.state.current_white_piece);
    // 持ち駒をクリックしたとき
    if(i < Setting.WHITE * 2){
      if(clicked_piece === Setting.UNCLICKED){
        if((turn ? (i < Setting.WHITE && current_black_piece[i] > 0) : (i >= Setting.WHITE && current_white_piece[i - Setting.WHITE] > 0 && !is_online))){
          // 候補の列挙
          // 駒を打つときは王手がかかっていないかと、行き所がないか、二歩、打ち歩詰めをチェックする
          let tmp_control_piece = set_control_piece(true);
          let num = (i >= Setting.WHITE ? i - Setting.WHITE : i);
          for(let x = 0; x < Setting.LENGTH; ++x){
            for(let y = 0; y < Setting.LENGTH; ++y){
              // 駒がある場所は置けない
              if(tmp_pos[x][y].piece_num() !== Setting.MT){
                tmp_control_piece[x][y] = false;
              }
              else if(num === 4){
                tmp_control_piece[x][y] = (turn ? y > 1 : y < Setting.LENGTH - 1 - 1);
              }
              else if(num === 5){
                tmp_control_piece[x][y] = (turn ? y !== 0 : y !== Setting.LENGTH - 1);
              }
              else if(num === 6){
                tmp_control_piece[x][y] = (turn ? y !== 0 : y !== Setting.LENGTH - 1);
                tmp_pos[x][y] = set_piece(num, turn);
                if(nifu(tmp_pos, x, turn)){
                  tmp_control_piece[x][y] = false;
                }
                // 打ち歩詰めかどうか
                // 前に敵玉がいるときだけチェックすればよい
                if((turn ? (y > 1 && tmp_pos[x][y - 1].piece_num() === 7 && tmp_pos[x][y - 1].turn() !== turn) : (y < Setting.LENGTH - 1 && tmp_pos[x][y + 1].piece_num() === 7 && tmp_pos[x][y + 1].turn() !== turn))){
                  if(mate(tmp_pos, (turn ? current_white_piece : current_black_piece), !turn)){
                    tmp_control_piece[x][y] = false;
                  }
                }
                // 盤面を戻す
                tmp_pos[x][y] = new Mt();
              }
              if(tmp_control_piece[x][y]){
                tmp_pos[x][y] = set_piece(num, turn);
                tmp_control_piece[x][y] = !check(tmp_pos, turn);
                tmp_pos[x][y] = new Mt();
              }
            }
          }
          this.setState({
            control_piece: tmp_control_piece,
            clicked_piece: i,
          });
        }
        return;
      }
      this.setState({
        clicked_piece: Setting.UNCLICKED,
        control_piece: set_control_piece(),
      });
      return;
    }

    // 持ち駒の分を引く
    let x: number = Math.floor((i - Setting.WHITE * 2) / Setting.LENGTH);
    let y: number = (i - Setting.WHITE * 2) % Setting.LENGTH;
    const current_pos = this.state.current_pos.concat();
    // 駒を掴んでないとき
    if(this.state.clicked_piece === Setting.UNCLICKED){
      // 手番の駒以外はダメ
      if(current_pos[x][y].piece_num() === Setting.MT || current_pos[x][y].turn() !== turn || (is_online && !turn)){
        return;
      }
      // 候補の列挙
      // 王手がかかっていないかのみをチャックすればよい
      // 駒を成らないので候補に行き所がない駒が含まれることもあるが、チェックする必要はない
      // これは適切な移動ならば行き所のない駒はできないため
      let tmp_control_pos = control_pos(current_pos, turn, x, y, -1, -1, false);
      let tmp_control_piece = set_control_piece(false);
      for(let xx = 0; xx < Setting.LENGTH; ++xx){
        for(let yy = 0; yy < Setting.LENGTH; ++yy){
          if(tmp_control_pos[xx][yy] === 0){
            continue;
          }
          // 手番の駒はダメ
          if(current_pos[xx][yy].piece_num() !== Setting.MT && current_pos[xx][yy].turn() === turn){
            continue;
          }
          let piece = tmp_pos[xx][yy];
          tmp_pos[xx][yy] = tmp_pos[x][y];
          tmp_pos[x][y] = new Mt();
          tmp_control_piece[xx][yy] = !check(tmp_pos, turn);
          tmp_pos[x][y] = tmp_pos[xx][yy];
          tmp_pos[xx][yy] = piece;
        }
      }
      this.setState({
        control_piece: tmp_control_piece,
        clicked_piece: i,
      });
      return;
    }

    // ここでは必ず盤面をクリックしている
    let current_control_piece = this.state.control_piece;
    // 候補になかったらダメ
    if(!current_control_piece[x][y]){
      this.setState({
        control_piece: set_control_piece(),
        clicked_piece: Setting.UNCLICKED,
      });
      return;
    }

    // 以下では正しい指し手であることが保証されている
    const moves = this.state.moves;
    let tmp_black_piece = _.cloneDeep(current_black_piece);
    let tmp_white_piece = _.cloneDeep(current_white_piece);
    let xx: number = -1;
    let yy: number = -1;
    // 持ち駒を掴んでいるとき
    if(clicked_piece < Setting.WHITE * 2){
      // 先手の駒を掴んでいる場合
      // 掴むときに手番かチェックしているので、ここではチェックしなくてよい
      if(turn){
        // 持ち駒の更新
        --tmp_black_piece[clicked_piece];
         // 盤面の更新
        tmp_pos[x][y] = set_piece(clicked_piece, turn);
      }
      else{
        // 持ち駒の更新
        --tmp_white_piece[clicked_piece - Setting.WHITE];
         // 盤面の更新
        tmp_pos[x][y] = set_piece(clicked_piece - Setting.WHITE, turn);
      }
    }
    else{
      // 持ち駒の分を引く
      xx = Math.floor((clicked_piece - Setting.WHITE * 2) / Setting.LENGTH);
      yy = (clicked_piece- Setting.WHITE * 2) % Setting.LENGTH;
      let piece = tmp_pos[x][y];
      // 盤面の更新
      tmp_pos[x][y] = tmp_pos[xx][yy];
      tmp_pos[xx][yy] = new Mt();
      // 持ち駒の更新
      let num: number = piece.piece_num();
      if(num !== Setting.MT){
        // 成っている駒を生に戻す
        if(num > Setting.WHITE){
          num -= Setting.MT / 2;
        }
        turn ? ++tmp_black_piece[num] : ++tmp_white_piece[num];
      }
    }

    // 成れるときは聞く
    // 条件：盤面から3段目に移動または3段目から移動するときで、金と玉以外の成っていない駒のとき
    let num: number = tmp_pos[x][y].piece_num();
    let is_promoted: Boolean = false;
    if(xx !== -1 && (turn ? (y < 3 || yy < 3) : (y > Setting.LENGTH - 1 - 3 || yy > Setting.LENGTH - 1 - 3)) && num < Setting.WHITE && Setting.PIECES[num + Setting.MT / 2] !== ""){
      // 必ず成るときは聞かずに成る
      // 歩、香の1段目、桂の1,2段目
      if(5 <= num && num <= 6){
        if((turn ? y === 0 : y === Setting.LENGTH - 1)){
          tmp_pos[x][y].promote();
          is_promoted = true;
        }
      }
      else if(num === 4){
        if((turn ? y < 2 : y > Setting.LENGTH - 1 - 2)){
          tmp_pos[x][y].promote();
          is_promoted = true;
        }
      }
      if(!is_promoted){
        this.setState({
          moved_piece: i,
          promotion: true,
        });
        return;
      }
    }
    let kifu = this.state.kifu;
    kifu = kifu.concat(clicked_piece);
    kifu = kifu.concat(is_promoted ? (i + Setting.LENGTH * Setting.LENGTH) : i);
    this.setState({
      current_pos: tmp_pos,
      current_black_piece: tmp_black_piece,
      current_white_piece: tmp_white_piece,
      control_piece: set_control_piece(),
      kifu: kifu,
      turn: !turn,
      moves: moves + 1,
      moves_sub: moves + 1,
      clicked_piece: Setting.UNCLICKED,
      final_piece: i,
    });
    // 詰んでいたら対局終了
    if(mate(tmp_pos, (turn ? tmp_white_piece : tmp_black_piece), !turn)){
      setTimeout(() => {
        this.setState({
          result: true,
        });
      }, 200);
      this.setState({
        moves: -1,
        moves_max: moves + 1,
      });
      return;
    }
  }

  resign(){
    const moves: number = this.state.moves;
    if(moves < 0){
      return;
    }
    this.setState({
      resign: true,
    });
  }

  rotate(){
    this.setState({
      is_black: !this.state.is_black,
      clicked_piece: Setting.UNCLICKED,
      control_piece: set_control_piece(),
    });
    return;
  }

  handlePromotion(is_promoted: boolean){
    // 正しい動きであることは保証されている
    let clicked_piece: number = this.state.clicked_piece;
    const turn = this.state.turn;
    let tmp_pos = _.cloneDeep(this.state.current_pos);  // 動かした後の盤面
    const current_black_piece = _.cloneDeep(this.state.current_black_piece);
    const current_white_piece = _.cloneDeep(this.state.current_white_piece);
    const moves = this.state.moves;
    let tmp_black_piece = _.cloneDeep(current_black_piece);
    let tmp_white_piece = _.cloneDeep(current_white_piece);
    let xx: number = -1;
    let yy: number = -1;
    let i = this.state.moved_piece;
    let x: number = Math.floor((i - Setting.WHITE * 2) / Setting.LENGTH);
    let y: number = (i - Setting.WHITE * 2) % Setting.LENGTH;
    // 持ち駒を掴んでいるとき
    if(clicked_piece < Setting.WHITE * 2){
      // 先手の駒を掴んでいる場合
      if(turn){
        // 持ち駒の更新
        --tmp_black_piece[clicked_piece];
         // 盤面の更新
        tmp_pos[x][y] = set_piece(clicked_piece, turn);
      }
      else{
        // 持ち駒の更新
        --tmp_white_piece[clicked_piece - Setting.WHITE];
         // 盤面の更新
        tmp_pos[x][y] = set_piece(clicked_piece - Setting.WHITE, turn);
      }
    }
    else{
      // 持ち駒の分を引く
      xx = Math.floor((clicked_piece - Setting.WHITE * 2) / Setting.LENGTH);
      yy = (clicked_piece- Setting.WHITE * 2) % Setting.LENGTH;
      let piece = tmp_pos[x][y];
      // 盤面の更新
      tmp_pos[x][y] = tmp_pos[xx][yy];
      tmp_pos[xx][yy] = new Mt();
      // 持ち駒の更新
      let num: number = piece.piece_num();
      if(num !== Setting.MT){
        // 成っている駒を生に戻す
        if(num > Setting.WHITE){
          num -= Setting.MT / 2;
        }
        turn ? ++tmp_black_piece[num] : ++tmp_white_piece[num];
      }
    }
    if(is_promoted){
      tmp_pos[x][y].promote();
    }
    let kifu = this.state.kifu;
    kifu = kifu.concat(clicked_piece);
    kifu = kifu.concat(is_promoted ? (i + Setting.LENGTH * Setting.LENGTH) : i);
    this.setState({
      current_pos: tmp_pos,
      current_black_piece: tmp_black_piece,
      current_white_piece: tmp_white_piece,
      control_piece: set_control_piece(),
      kifu: kifu,
      turn: !turn,
      moves: moves + 1,
      moves_sub: moves + 1,
      clicked_piece: Setting.UNCLICKED,
      final_piece: i,
      moved_piece: Setting.UNCLICKED,
      promotion: false,
    });
    // 詰んでいたら対局終了
    if(mate(tmp_pos, (turn ? tmp_white_piece : tmp_black_piece), !turn)){
      setTimeout(() => {
        this.setState({
          result: true,
        });
      }, 200);
      this.setState({
        moves: -1,
        moves_max: moves + 1,
      });
      return;
    }
  }

  handleResign(resign: boolean){
    const moves = this.state.moves;
    if(resign){
      setTimeout(() => {
        this.setState({
          result: true,
        });
      }, 200);
      this.setState({
        moves: -1,
        moves_max: moves,
        clicked_piece: Setting.UNCLICKED,
        control_piece: set_control_piece(),
        resign: false,
      });
    }
    else{
      this.setState({
        resign: false,
      });
    }
  }

  handleResultClose(){
    this.setState({
      result: false,
    });
  }

  // kifuの不正な指し手はないので手のチェックはしない
  setBoard(target_moves: number){
    if(target_moves < 0){
      target_moves = 0;
    }
    if(target_moves > this.state.moves_max){
      target_moves = this.state.moves_max;
    }
    let cur = 0;
    let idx = 0;
    const kifu = this.state.kifu;
    let tmp_pos = _.cloneDeep(this.state.start_pos);
    let tmp_black_piece = _.cloneDeep(this.state.start_black_piece);
    let tmp_white_piece = _.cloneDeep(this.state.start_white_piece);
    let clicked_piece = Setting.UNCLICKED;
    let final_piece = Setting.UNCLICKED;
    let turn = true;
    while(cur < target_moves){
      let i = kifu[idx];
      // 駒を掴んでいないとき
      if(clicked_piece === Setting.UNCLICKED){
        clicked_piece = kifu[idx];
        ++idx;
        continue;
      }
      // 持ち駒を掴んでいるとき
      if(clicked_piece < Setting.WHITE * 2){
        const x = Math.floor((i - Setting.WHITE * 2) / Setting.LENGTH);
        const y = (i - Setting.WHITE * 2) % Setting.LENGTH;
        // 先手の駒を掴んでいる場合
        if(turn){
          --tmp_black_piece[clicked_piece];
          // 盤面の更新
          tmp_pos[x][y] = set_piece(clicked_piece, turn);
        }
        else{
          // 持ち駒の更新
          --tmp_white_piece[clicked_piece - Setting.WHITE];
          // 盤面の更新
          tmp_pos[x][y] = set_piece(clicked_piece - Setting.WHITE, turn);
        }
        clicked_piece = Setting.UNCLICKED;
        final_piece = i;
        turn = !turn;
        ++cur;
        ++idx;
        continue;
      }
      // 持ち駒の分を引く
      // 成りフラグをチェック
      let promoted_flag = false;
      if(i >= Setting.LENGTH * Setting.LENGTH + Setting.WHITE  *2){
        promoted_flag = true;
        i -= Setting.LENGTH * Setting.LENGTH;
      }
      const x = Math.floor((i - Setting.WHITE * 2) / Setting.LENGTH);
      const y = (i - Setting.WHITE * 2) % Setting.LENGTH;
      const xx = Math.floor((clicked_piece - Setting.WHITE * 2) / Setting.LENGTH);
      const yy = (clicked_piece - Setting.WHITE * 2) % Setting.LENGTH;
      let piece = tmp_pos[x][y];
      // 盤面の更新
      tmp_pos[x][y] = tmp_pos[xx][yy];
      tmp_pos[xx][yy] = new Mt();
      // 持ち駒の更新
      let num: number = piece.piece_num();
      if(num !== Setting.MT){
        // 成っている駒を生に戻す
        if(num > Setting.WHITE){
          num -= Setting.MT / 2;
        }
        turn ? ++tmp_black_piece[num] : ++tmp_white_piece[num];
      }
      if(promoted_flag){
        tmp_pos[x][y].promote();
      }
      clicked_piece = Setting.UNCLICKED;
      final_piece = i;
      turn = !turn;
      ++cur;
      ++idx;
    }
    this.setState({
      current_pos: tmp_pos,
      current_black_piece: tmp_black_piece,
      current_white_piece: tmp_white_piece,
      final_piece: final_piece,
      moves_sub: target_moves,
      turn: turn,
    });
  }

  render() {
    let game: string = "game-info space";
    if(!this.state.is_black){
      game += " white";
    }
    const moves = this.state.moves_sub;
    const legend = (this.state.is_black ? `△${this.state.white_name}　▲${this.state.black_name}` : `▲${this.state.black_name}　△${this.state.white_name}`);
    const moves_max = this.state.moves_max;

    const is_mobile = this.state.is_mobile;

    const font_size = (is_mobile ? 'small' : 'large');
    const button_size = (is_mobile ? 'small' : 'medium');

    const back10 = (this.state.moves === -1 && moves > 0 ?
      <Button variant="contained" onClick={() => this.setBoard(moves - 10)}>
        <Replay10OutlinedIcon fontSize={font_size}/>
      </Button>
      :
      <Button variant="contained" disabled onClick={() => this.setBoard(moves - 10)}>
        <Replay10OutlinedIcon fontSize={font_size}/>
      </Button>
      );
    const back1 = (this.state.moves === -1 && moves > 0 ?
      <Button variant="contained" onClick={() => this.setBoard(moves - 1)}>
        <ArrowBackIosIcon fontSize={font_size}/>
      </Button>
      :
      <Button variant="contained" disabled onClick={() => this.setBoard(moves - 1)}>
        <ArrowBackIosIcon fontSize={font_size}/>
      </Button>
      );
    const forward1 = (this.state.moves === -1 && moves < this.state.moves_max ?
      <Button variant="contained" onClick={() => this.setBoard(moves + 1)}>
        <ArrowForwardIosIcon fontSize={font_size}/>
      </Button>
      :
      <Button variant="contained" disabled onClick={() => this.setBoard(moves + 1)}>
        <ArrowForwardIosIcon fontSize={font_size}/>
      </Button>
      );
    const forwad10 = (this.state.moves === -1 && moves < this.state.moves_max ?
      <Button variant="contained" onClick={() => this.setBoard(moves + 10)}>
        <Forward10OutlinedIcon fontSize={font_size}/>
      </Button>
      :
      <Button variant="contained" disabled onClick={() => this.setBoard(moves + 10)}>
        <Forward10OutlinedIcon fontSize={font_size}/>
      </Button>
    );
    if(is_mobile){
      return (
        <div className="game-info">
          <div className="game">
            <div className="game-sub">
            {this.state.moves >= 0 &&
              <div className="mobile-button">
                <Button variant="contained" color="secondary" size={button_size} onClick={() => this.resign()}>
                  投了
                </Button>
              </div>
            }
              <div className="mobile-button">
                <Button variant="contained" color="primary" size={button_size} onClick={() => this.rotate()} >
                  反転
                </Button>
              </div>
            </div>
            {this.state.moves === -1 && moves_max > 0 &&
              <div className="mobile-button">
                <Button variant="contained" size={button_size} color="inherit" onClick={() => this.setBoard(0)}>
                  開始局面
                </Button>
              </div>
            }
            {this.state.moves === -1 && moves_max > 0 &&
              <div className="mobile-button">
                <Button variant="contained" size={button_size} color="inherit" onClick={() => this.setBoard(moves_max)}>
                  終局図
                </Button>
              </div>
            }
            <div className="center bold">
              {legend}
            </div>
            <div className="center">
              {back1}
              &nbsp;
              {moves}手目
              &nbsp;
              {forward1}
            </div>
            <div className={game}>
              <div className="mobile-game-info-white white">
                <div>{"△"}</div>
                <Captured
                  squares={this.state.current_white_piece}
                  clicked_piece={this.state.clicked_piece}
                  is_black={false}
                  turn={this.state.turn}
                  onClick={i => this.handleClick(i)}
                  is_mobile={is_mobile}
                />
              </div>
              <div>
                <Board
                  squares={this.state.current_pos}
                  onClick={i => this.handleClick(i)}
                  clicked_piece={this.state.clicked_piece}
                  control_piece={this.state.control_piece}
                  final_piece={this.state.final_piece}
                  is_mobile={is_mobile}
                />
              </div>
              <div className="mobile-game-info-black">
                <div>{"▲"}</div>
                <Captured
                  squares={this.state.current_black_piece}
                  clicked_piece={this.state.clicked_piece}
                  is_black={true}
                  turn={this.state.turn}
                  onClick={i => this.handleClick(i)}
                  is_mobile={is_mobile}
                />
              </div>
            </div>
          </div>
          <Confirm
            title={"成りますか？"}
            message={""}
            open={this.state.promotion}
            handleYes={() => this.handlePromotion(true)}
            handleNo={() => this.handlePromotion(false)}
          />
          <Confirm
            title={"投了しますか？"}
            message={""}
            open={this.state.resign}
            handleYes={() => this.handleResign(true)}
            handleNo={() => this.handleResign(false)}
          />
          <Alert
            title={`まで${moves}手にて${(this.state.turn ? this.state.white_name : this.state.black_name)}の勝ちです！`}
            message={""}
            open={this.state.result}
            handleClose={this.handleResultClose}
          />
        </div>
      );
    }
    return (
      <div className="game-info">
        <div className="game">
          <div className="center bold">
            {legend}
          </div>
          <div className="center">
            {back10}
            &nbsp;
            {back1}
            &nbsp;
            {moves}手目
            &nbsp;
            {forward1}
            &nbsp;
            {forwad10}
          </div>
          <div className={game}>
            <div className="game-info-white white">
              <div>{"△"}</div>
              <Captured
                squares={this.state.current_white_piece}
                clicked_piece={this.state.clicked_piece}
                is_black={false}
                turn={this.state.turn}
                onClick={i => this.handleClick(i)}
                is_mobile={is_mobile}
              />
            </div>
            <div className="game-board">
              <Board
                squares={this.state.current_pos}
                onClick={i => this.handleClick(i)}
                clicked_piece={this.state.clicked_piece}
                control_piece={this.state.control_piece}
                final_piece={this.state.final_piece}
                is_mobile={is_mobile}
              />
            </div>
            <div className="game-info-black">
              <div>{"▲"}</div>
              <Captured
                squares={this.state.current_black_piece}
                clicked_piece={this.state.clicked_piece}
                is_black={true}
                turn={this.state.turn}
                onClick={i => this.handleClick(i)}
                is_mobile={is_mobile}
              />
            </div>
          </div>
        </div>
        <div className="game-sub">
          {this.state.moves >= 0 &&
            <div className="button">
              <Button variant="contained" color="secondary" size={button_size} onClick={() => this.resign()}>
                投了
              </Button>
            </div>
          }
          <div className="button">
            <Button variant="contained" color="primary" size={button_size} onClick={() => this.rotate()} >
              反転
            </Button>
          </div>
          {this.state.moves === -1 && moves_max > 0 &&
            <div className="button">
              <Button variant="contained" size={button_size} color="inherit" onClick={() => this.setBoard(0)}>
                開始局面
              </Button>
            </div>
          }
          {this.state.moves === -1 && moves_max > 0 &&
            <div className="button">
              <Button variant="contained" size={button_size} color="inherit" onClick={() => this.setBoard(moves_max)}>
                終局図
              </Button>
            </div>
          }
        </div>
        <Confirm
          title={"成りますか？"}
          message={""}
          open={this.state.promotion}
          handleYes={() => this.handlePromotion(true)}
          handleNo={() => this.handlePromotion(false)}
        />
        <Confirm
          title={"投了しますか？"}
          message={""}
          open={this.state.resign}
          handleYes={() => this.handleResign(true)}
          handleNo={() => this.handleResign(false)}
        />
        <Alert
          title={`まで${moves}手にて${(this.state.turn ? this.state.white_name : this.state.black_name)}の勝ちです！`}
          message={""}
          open={this.state.result}
          handleClose={this.handleResultClose}
        />
      </div>
    );
  }
}
