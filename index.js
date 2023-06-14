class Mynode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class linkedlist {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  display() {
    let node = this.head;
    while (node) {
      console.log(node.value);
      node = node.next;
    }
  }

  search(value) {
    let node = this.head;
    while (node) {
      if (node.value == value) {
        return node;
      }
      node = node.next;
    }
    return null;
  }

  insert(newvalue, bvalue = this.tail) {
    let newn = new Mynode(newvalue);

    if (!this.head) {
      this.head = newn;
      this.tail = newn;
    } else if (typeof bvalue == "object" || this.tail.value == bvalue) {
      this.tail.next = newn;
      this.tail = newn;
    } else {
      let prev = this.search(bvalue);
      let after = prev.next;
      prev.next = newn;
      newn.next = after;
    }
  }

  d_pop() {
    if (this.head == this.tail) {
      var node = this.head;
      this.head = null;
      this.tail = null;
    } else {
      var node = this.head;
      while (node.next) {
        if (node.next == this.tail) {
          var prev = node;
        }
        node = node.next;
      }
      prev.next = null;
      this.tail = prev;
    }
    return node.value;
  }

  delete(value) {
    let node = this.head;
    if (value == this.tail.value) {
      this.d_pop();
    } else {
      while (node.next) {
        if (node.next.value == value) {
          var prev = node;
          var deleted = node.next;
          prev.next = deleted.next;
        }
        node = node.next;
      }
    }
  }
}

let x = new linkedlist();

function addImageToAlbum() {
  let imageInput = document.getElementById("imageInput");
  let imageDisplay = document.getElementById("imageDisplay");

  if (imageInput.files.length > 0) {
    let file = imageInput.files[0];
    let reader = new FileReader();

    reader.onload = function (e) {
      let image = document.createElement("img");
      image.src = e.target.result;

      let imageWrapper = document.createElement("div");
      imageWrapper.appendChild(image);


      let downButton = document.createElement("button");
      downButton.innerText = "Down";
      downButton.addEventListener("click", function () {
        moveImageDown(imageWrapper);
      });
      imageWrapper.appendChild(downButton);


      let upButton = document.createElement("button");
      upButton.innerText = "Up";
      upButton.addEventListener("click", function () {
        moveImageUp(imageWrapper);
      });
      imageWrapper.appendChild(upButton);

      imageDisplay.appendChild(imageWrapper);
    };

    reader.readAsDataURL(file);
  }
}

function moveImageDown(imageWrapper) {
  let nextNode = imageWrapper.nextSibling;
  if (nextNode) {
    imageDisplay.insertBefore(imageWrapper, nextNode.nextSibling);
  }
}

function moveImageUp(imageWrapper) {
  if (imageWrapper.previousSibling !== imageDisplay.firstChild) {
    imageDisplay.insertBefore(
      imageWrapper,
      imageWrapper.previousSibling.previousSibling
    );
  }
}
