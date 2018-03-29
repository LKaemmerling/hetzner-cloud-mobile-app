import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, ViewController} from "ionic-angular";
import {ServerApiProvider} from "../../../providers/server-api/server-api";

import RFB from '@novnc/novnc/core/rfb.js';
import {Server} from "../../../modules/hetzner-cloud-data/servers/server";

var KeyTable = require('@novnc/novnc/core/input/keysym.js').default;
var keysyms = require('@novnc/novnc/core/input/keysymdef.js').default;
var Keyboard = require('@novnc/novnc/core/input/keyboard.js').default;

@Component({
  selector: 'modal-console',
  templateUrl: 'console.html'
})
export class consoleModal {
  /**
   *
   */
  public server: Server;
  /**
   *
   */
  public payload;
  /**
   *
   */
  public rfb;
  /**
   *
   */
  public input: string;
  /**
   *
   */
  protected defaultKeyboardinputLen: 100;
  /**
   *
   */
  protected lastKeyboardinput: string;
  /**
   *
   */
  protected touchKeyboard;

  /**
   *
   * @param {ViewController} viewCtrl
   * @param {ServerApiProvider} serverApiProvider
   * @param {NavParams} navParams
   * @param {NavController} navCtrl
   * @param {LoadingController} loadingCtrl
   */
  constructor(public viewCtrl: ViewController, public serverApiProvider: ServerApiProvider, public navParams: NavParams, public navCtrl: NavController, public loadingCtrl: LoadingController) {
    this.server = navParams.get('server');
    this.serverApiProvider.requestConsole(this.server.id).then((response) => {
      this.rfb = new RFB(document.getElementById('console_container'), response['wss_url'], {credentials: {password: response['password']}});
      this.rfb.viewOnly = false;
      document.getElementById("noVNC_keyboardinput")
        .addEventListener('submit', function () {
          return false;
        });
      document.getElementById("noVNC_keyboardinput")
        .addEventListener('input', (event) => {
          this.keyInput(event);
        });
      document.getElementById("noVNC_keyboardinput")
        .addEventListener('focus', (event) => {
          this.onfocusVirtualKeyboard(event)
        });
      document.getElementById("noVNC_keyboardinput")
        .addEventListener('blur', (event) => {
          this.onblurVirtualKeyboard(event)
        });
      this.touchKeyboard = new Keyboard(document.getElementById('noVNC_keyboardinput'));
      this.touchKeyboard.onkeyevent = (keysym, code, down) => {
        this.keyevent(keysym, code, down);
      };
      this.touchKeyboard.grab();
    });
  }

  /**
   *
   * @param keysym
   * @param code
   * @param down
   */
  keyevent(keysym, code, down) {
    if (!this.rfb) return;

    this.rfb.sendKey(keysym, code, down);
  }

  /**
   *
   */
  protected showVirtualKeyboard() {
    var input = <HTMLInputElement>document.getElementById('noVNC_keyboardinput');

    if (document.activeElement == input) return;

    input.focus();

    try {
      var l = input.value.length;
      // Move the caret to the end
      input.setSelectionRange(l, l);
    } catch (err) {
    } // setSelectionRange is undefined in Google Chrome
  }

  /**
   *
   * @param event
   */
  protected onblurVirtualKeyboard(event) {
    document.getElementById('noVNC_keyboard_button')
      .classList.remove("noVNC_selected");
    if (this.rfb) {
      this.rfb.focusOnClick = true;
    }
  }

  /**
   *
   * @param event
   */
  protected onfocusVirtualKeyboard(event) {
    document.getElementById('noVNC_keyboard_button')
      .classList.add("noVNC_selected");
    if (this.rfb) {
      this.rfb.focusOnClick = false;
    }
  }

  /**
   *
   */
  protected hideVirtualKeyboard() {
    var input = document.getElementById('noVNC_keyboardinput');

    if (document.activeElement != input) return;

    input.blur();
  }

  /**
   *
   */
  public keyboard() {
    if (document.getElementById('noVNC_keyboard_button')
        .classList.contains("noVNC_selected")) {
      this.hideVirtualKeyboard();
    } else {
      this.showVirtualKeyboard();
    }

  }

  /**
   *
   */
  protected resetKeyboard() {
    var kbi = <HTMLInputElement>document.getElementById('noVNC_keyboardinput');
    kbi.value = new Array(this.defaultKeyboardinputLen).join("_");
    this.lastKeyboardinput = kbi.value;
  }

  /**
   *
   * @param event
   */
  public keyInput(event) {
    var newValue = event.target.value;
    if (!this.lastKeyboardinput) {
      this.resetKeyboard();
    }
    var oldValue = this.lastKeyboardinput;
    var newLen;
    try {
      // Try to check caret position since whitespace at the end
      // will not be considered by value.length in some browsers
      newLen = Math.max(event.target.selectionStart, newValue.value.length);
    } catch (err) {
      // selectionStart is undefined in Google Chrome
      newLen = newValue.length;
    }
    var oldLen = oldValue.length;

    var backspaces;
    var inputs = newLen - oldLen;
    if (inputs < 0) {
      backspaces = -inputs;
    } else {
      backspaces = 0;
    }

    // Compare the old string with the new to account for
    // text-corrections or other input that modify existing text
    var i;
    for (i = 0; i < Math.min(oldLen, newLen); i++) {
      if (newValue.charAt(i) != oldValue.charAt(i)) {
        inputs = newLen - i;
        backspaces = oldLen - i;
        break;
      }
    }

    // Send the key events
    for (i = 0; i < backspaces; i++) {
      this.rfb.sendKey(KeyTable.XK_BackSpace, "Backspace");
    }
    for (i = newLen - inputs; i < newLen; i++) {
      this.rfb.sendKey(keysyms.lookup(newValue.charCodeAt(i)));
    }

    // Control the text content length in the keyboardinput element
    if (newLen > 2 * this.defaultKeyboardinputLen) {
      this.resetKeyboard();
    } else if (newLen < 1) {
      // There always have to be some text in the keyboardinput
      // element with which backspace can interact.
      this.resetKeyboard();
      // This sometimes causes the keyboard to disappear for a second
      // but it is required for the android keyboard to recognize that
      // text has been added to the field
      event.target.blur();
      // This has to be ran outside of the input handler in order to work
      setTimeout(event.target.focus.bind(event.target), 0);
    } else {
      this.lastKeyboardinput = newValue;
    }
  }

  /**
   *
   * @returns {boolean}
   */
  public sendCtrlAltDel() {
    this.rfb.sendCtrlAltDel();
    return false;
  }

  /**
   *
   */
  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
