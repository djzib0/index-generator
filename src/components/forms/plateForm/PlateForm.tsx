'use client'
import { steelGrades } from "@/lib/data";
import { convertDotToComa, createStringWithSingleWhiteSpaces, removeZeroCharFromNum } from "@/lib/utils";
import { useEffect, useState } from "react";
// icons import
import { CiLock } from "react-icons/ci";
import { FaRegCopy, FaTrashCan } from "react-icons/fa6";
// styles import
import styles from "./plateForm.module.css"
import { FaUndo } from "react-icons/fa";

type PlateFormProps = {
  name: string;
  thickness: number;
  gradeEU: string;
  gradeGer: string;
  additional: string;
}

const PlateForm = () => {

  const gradeOptionsArr = steelGrades.map((grade) => {
    return (
      <option key={grade.EuNorm + grade.GerNorm} value={grade.EuNorm}>{grade.EuNorm}</option>
    )
  })

  const initialFormData = {
      name: "Blacha",
      thickness: 0,
      gradeEU: "",
      gradeGer: "",
      additional: "",
  }

  // state variables
  const [formData, setFormData] = useState<PlateFormProps>(initialFormData)
  const [savedFormData, setSavedFormData] = useState<PlateFormProps>(initialFormData)
  const [isUndoOn, setIsUndoOn] = useState(false);
  const [isFormValidationError, setIsFormValidationError] = useState<boolean>(true);
  const [formErrorMessage, setFormErrorMessage] = useState<string>("")
  const [indexName, setIndexName] = useState("")


  useEffect(() => {
    const newIndexName = `${formData.name} t=${convertDotToComa(removeZeroCharFromNum(formData.thickness))} mm ${formData.gradeEU} ${formData.additional}`
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

  const clearForm = () => {
    setFormData(initialFormData);
    setSavedFormData(formData)
    setIsUndoOn(true);
  }

  const undo = () => {
    setIsUndoOn(false);
    setFormData(savedFormData);
  }

  const checkForm = () => {
    setFormErrorMessage("")
    setIsFormValidationError(false);
    if (
      formData.thickness.toString() === "0" ||
      formData.thickness === 0 ||
      !formData.thickness 
    ) {
      setIsFormValidationError(true);
      setFormErrorMessage(`Wymiar "grubość" nie może być pusty lub równy 0`)
      return
    }
    if (
      formData.gradeEU === ""
    ) {
      setIsFormValidationError(true);
      setFormErrorMessage(`Wybierz gatunek materiału`)
      return
    }
  }
  
  const handleCopy = () => {
    // reset clipboard
    navigator.clipboard.writeText("")
    checkForm();
  }

  useEffect(() => {
    const copyToClipboard = () => {
      navigator.clipboard.writeText(indexName)
      setIsUndoOn(false)
    }
    if (!isFormValidationError) {
      copyToClipboard();
    }
  }, [isFormValidationError, indexName])

  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        <div className={styles.formElement}>
          <label htmlFor='name'>Nazwa<span className={styles.lockIcon}><CiLock /></span></label>
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
            min={0}
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
          <label htmlFor='additional'>Dodatkowy opis</label>
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
          onClick={handleCopy}
          className={"resultIndexCopyBtn"}
        >
          <FaRegCopy />
        </button>
        {!isUndoOn && <button 
          onClick={clearForm}
          className={"resultIndexCopyBtn"}
        >
          <FaTrashCan />
        </button>}
        {isUndoOn && <button 
          onClick={undo}
          className={"resultIndexCopyBtn"}
        >
          <FaUndo />
        </button>}
      </div>
      {formErrorMessage && 
        <div className={styles.errorMessageContainer}>
          {formErrorMessage}
        </div>
      }
    </div>
  )
}

export default PlateForm