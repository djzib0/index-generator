'use client'
import { steelGrades } from "@/lib/data";
import { createStringWithSingleWhiteSpaces } from "@/lib/utils";
import { useEffect, useState } from "react";
// icons import
import { CiLock } from "react-icons/ci";
import { FaRegCopy } from "react-icons/fa6";
// styles import
import styles from "./plateForm.module.css"


const PlateForm = () => {

  const gradeOptionsArr = steelGrades.map((grade) => {
    return (
      <option key={grade.EuNorm + grade.GerNorm} value={grade.EuNorm}>{grade.EuNorm}</option>
    )
  })

  // state variables
  const [formData, setFormData] = useState(
    {
      name: "Blacha",
      thickness: 0,
      gradeEU: "",
      gradeGer: "",
      additional: "",
    }
  );

  const [indexName, setIndexName] = useState("")

  console.log(indexName);

  useEffect(() => {
    const newIndexName = `${formData.name} t=${formData.thickness} mm ${formData.gradeEU} ${formData.additional}`
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
      <form className={styles.plateForm}>
        <div className={styles.formElement}>
          <label htmlFor='name'>Nazwa<span><CiLock /></span></label>
          <input
            type='text'
            name='name'
            // onChange={handleChange}
            readOnly
            value={formData.name}
            disabled
          />
        </div>
        <div className={styles.formElement}>
          <label htmlFor='thickness'>Grubość</label>
          <input
            type='number'
            name='thickness'
            onChange={handleChange}
            value={formData.thickness}
          />
        </ div>
        <div className={styles.formElement}>
          <label htmlFor="gradeEU">Gatunek</label>
          <select
            name='gradeEU'
            onChange={handleChange}
            value={formData.gradeEU}
          >
            <option value={""}>---</option>
            {gradeOptionsArr}
          </select>
        </div>
        <div className={styles.formElement}>
          <label htmlFor='name'>Dodatkowy opis</label>
          <input
            type='text'
            name='additional'
            onChange={handleChange}
            value={formData.additional}
          />
        </div>
      </form>
      <div className={"resultIndexContainer"}>
        <p className={"resultIndexToCopy"}>{indexName}</p>
        <button 
          onClick={copyToClipboard}
          className={"resultIndexCopyBtn"}
        >
          <FaRegCopy />
        </button>
      </div>
    </div>
  )
}

export default PlateForm