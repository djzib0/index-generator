'use client'

import { createStringWithSingleWhiteSpaces } from "@/lib/utils";
import { useEffect, useState } from "react";
// icons import
import { FaRegCopy } from "react-icons/fa6";
// styles import
import styles from "./otherForm.module.css"
import Tooltip from "@/components/tooltip/Tooltip";

const OtherForm = () => {
  

  // state variables
  const [isShowTooltip, setIsShowTooltip] = useState(false);
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
  }, [formData]);

  useEffect(() => {
    if (isShowTooltip) {
      setTimeout(() => {
        setIsShowTooltip(false);
      }, 1900);
    } 
  }, [isShowTooltip]);

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
    setIsShowTooltip(true);
    navigator.clipboard.writeText(indexName)
  }

  return (
    <div className={styles.formContainer}>
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
      {isShowTooltip && <Tooltip message={"Skopiowano do schowka!"} />}
    </div>
  )
}

export default OtherForm