'use client'
import { steelGrades } from "@/lib/data";
import { createStringWithSingleWhiteSpaces } from "@/lib/utils";
import { useEffect, useState } from "react";
// icons import
import { CiLock } from "react-icons/ci";
import { FaRegCopy } from "react-icons/fa6";
// styles import
import styles from "./otherForm.module.css"

const OtherForm = () => {
  const gradeOptionsArr = steelGrades.map((grade) => {
    return (
      <option key={grade.EuNorm + grade.GerNorm} value={grade.EuNorm}>{grade.EuNorm}</option>
    )
  })

  // state variables
  const [formData, setFormData] = useState(
    {
      name: "",
    }
  );

  const [indexName, setIndexName] = useState("")

  console.log(indexName);

  useEffect(() => {
    const newIndexName = `${formData.name}`
    setIndexName(createStringWithSingleWhiteSpaces(newIndexName.toUpperCase()))
  }, [formData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value, type} = e.target
    if ("checked" in e.target) {
      const checked = e.target.checked
      setFormData(prevFormData => {
        return {
          ...prevFormData,
          [name]: type === "checkbox" ? checked: value
        }
      })
    }
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(indexName)
  }

  return (
    <div>
      <form className={styles.form}>
        <div className={styles.formElement}>
          <label htmlFor='name'>Nazwa</label>
          <input
            type='text'
            name='name'
            onChange={handleChange}
            value={formData.name}
          />
        </div>
       
      </form>
      {formData.name.length > 0 && <div className={"resultIndexContainer"}>
        <p className={"resultIndexToCopy"}>{indexName}</p>
        <button 
          onClick={copyToClipboard}
          className={"resultIndexCopyBtn"}
        >
          <FaRegCopy />
        </button>
      </div>}
    </div>
  )
}

export default OtherForm