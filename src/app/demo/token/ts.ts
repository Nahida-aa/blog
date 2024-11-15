// src/app/syntaxHighlight.tsx

// 变量声明
let isDone: boolean = false;
const decimal: number = 6;
const color: string = "blue";
const list: number[] = [1, 2, 3];
const tuple: [string, number] = ["hello", 10];
// 枚举
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;
// 函数
function add(x: number, y: number): number {
  return x + y;
}
// 接口
interface Person {
  firstName: string;
  lastName: string;
}
function greeter(person: Person) { // 2:entity.name.function
  return "Hello, " + person.firstName + " " + person.lastName;
}
let user = { firstName: "Jane", lastName: "Doe" };
// 类
class Animal {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`); // 3:support.function
  }
}
class Dog extends Animal {
  bark() {
    console.log("Woof! Woof!");
  }
}
const dog = new Dog("Rex");
dog.bark();
dog.move(10);
// 泛型
function identity<T>(arg: T): T {
  return arg;
}
let output = identity<string>("myString");
// 模块
import Example, { SomeModule } from "./tsx";
export { add, greeter, Animal, Dog, identity, Color, Person, SomeModule };
// 类型断言
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
// 联合类型
function padLeft(value: string, padding: number | string) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${typeof padding}'.`);
}
// 类型别名
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;

function getName(n: NameOrResolver): Name {
  if (typeof n === "string") {
    return n;
  } else {
    return n();
  }
}
// 字面量类型
type Easing = "ease-in" | "ease-out" | "ease-in-out";
class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === "ease-in") {
      // ...
    } else if (easing === "ease-out") {
      // ...
    } else if (easing === "ease-in-out") {
      // ...
    } else {
      // error! should not pass null or undefined.
    }
  }
}
let button = new UIElement();
button.animate(0, 0, "ease-in");
// 交叉类型
function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{};
  for (let id in first) {
    (result as any)[id] = (first as any)[id];
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (result as any)[id] = (second as any)[id];
    }
  }
  return result;
}
class Person {
  constructor(public name: string) {}
}
interface Loggable {
  log(): void;
}
class ConsoleLogger implements Loggable {
  log() {
    console.log("Logging...");
  }
}
var jim = extend(new Person("Jim"), new ConsoleLogger());
jim.name;
jim.log();