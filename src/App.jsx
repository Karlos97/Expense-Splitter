import { Fragment } from 'react'
import './App.scss'
import Header from './Components/Layout/Header/Header'
import Expenses from './Components/Expenses/Expenses'
// import SelectInput from "./Components/UI/SelectInput";
// Tam gdzie mamy składnie JSXa używamy rozszerzenia pliku .jsx :)

function App () {
  // const usersList = ["Maciek", "Tomek", "Ania","Maciek", "Tomek", "Ania","Maciek", "Tomek", "Ania"];
  // const obj = [...text].forEach(c => {
  //   obj.push({letter:c})
  // });
  // console.log(obj);
  const text = 'sghgsaga kjjy vtteet'

  let obj = []

  obj = [...text].forEach((c) => [...obj, { letter: c }])

  console.log(obj)
  // let obj2
  // {letter:"g"}
  // [...text].forEach((c, i) => {
  //   // obj.push({letter: c, count: i});
  //   obj2 = obj.map((el) => {
  //     if (el.letter === c) {
  //       console.log("zawiera");
  //       el.count += 1;
  //     } else {
  //       el.letter = c;
  //       el.count = 1;
  //       // console.log(c)
  //     }
  //     return el;
  //   });
  // });

  return (
    <>
      <Header title='Money splitter' />

      <main>
        <Expenses />

        {/* <SelectInput usersList={usersList}/> */}
      </main>
    </>
  )
}

export default App
