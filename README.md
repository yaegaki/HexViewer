HexViewer
=========

HexViewer for HTML


ブラウザ上でHexViewer(BinaryViewer)を表示するためのツール
jQuery依存
まだまだ未完成,getDownloadURLはchromeでのみ動作確認


使い方
jQueryをロードする.
HexViewer.cssとHexViewer.jsをロードする.
divのクラスにHexViewerを指定しidを付ける.

以下のような感じでやる.
var view = new HexViewer("div_id");
view.sedData("string or ArrayBuffer or Uint8Array");
view.getData();
view.changeData(pos, val);
view.getDownloadURL();




