"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Field,
  Input,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Popover,
  PopoverButton,
  PopoverPanel,
  Textarea,
  Transition,
} from "@headlessui/react";
import { clsx } from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { selectConfig } from "@/redux/features/configSlice";
import { addConfig } from "@/redux/features/configSlice";

import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { getModel, sendConfig } from "@/utils/chatApiCalls";
import { message } from "antd";

const llmOptions = [
  { label: "GPT-4", value: "gpt-4-turbo" },
  { label: "GPT-3", value: "gpt-3.5-turbo" },
  { label: "LLAMA3-8B", value: "llama3-8b-8192" },
  { label: "LLAMA3-70", value: "Llama3-70b-8192" },
  { label: "MIXTRAL", value: "mixtral-8x" },
];

const Configuration = () => {
  const [selectedLlm, setSelectedLlm] = useState(null);
  const [apiKey, setApiKey] = useState("");
  // const [placeholder, setPlaceholder] = useState("Select an option");

  const dispatch = useDispatch();

  const { llm, apiKey: key } = useSelector(selectConfig);

  const getdata = async () => {
    try {
      const data = await getModel();
      if (data?.model.length > 0) setSelectedLlm(data.model);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    // setSelectedLlm((prev) => (llm.length ? llm : prev));
    // setApiKey(key);
    getdata();
  }, []);

  const handleLlmChange = (value) => {
    setSelectedLlm(value);
    setApiKey(""); // Reset the apiKey when LLM model is changed
  };

  const handleSave = async (e) => {
    e.preventDefault();
    dispatch(addConfig({ llm: selectedLlm, apiKey }));
    const obj = llmOptions.find((option) => option.label === selectedLlm);
    console.log("obj: ", { model: obj.value, api: apiKey ?? null });
    // Handle saving the configuration here
    const data = await sendConfig({
      model: obj.value,
      api: apiKey?.length ? apiKey : null,
    });
    console.log("data: ", data);
    if (data === "Success") {
      message.success("Model configured successfully!");
    }
  };

  return (
    <Popover>
      <PopoverButton className="inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold border-white/10 border data-[hover]:border-white/25 data-[open]:border-white/25 text-white shadow-inner shadow-white/10 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white">
        Configuration{" "}
        <ChevronDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
      </PopoverButton>
      <Transition
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel
          anchor="bottom"
          className="rounded-xl bg-white/5 backdrop-blur-[16px] text-sm/6 [--anchor-gap:4px] sm:[--anchor-gap:8px]"
        >
          <form onSubmit={handleSave} className="p-3 md:w-[500px]">
            {/* LLM Options */}
            <div className="block rounded-lg py-2 px-3 transition hover:bg-white/5">
              <p className="font-semibold text-white">LLM Options</p>
              <Listbox value={selectedLlm} onChange={handleLlmChange}>
                <ListboxButton
                  className={clsx(
                    "relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                  )}
                >
                  {selectedLlm ? selectedLlm : "Select LLM option"}

                  <ChevronDownIcon
                    className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                    aria-hidden="true"
                  />
                </ListboxButton>
                <Transition
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <ListboxOptions
                    // anchor="bottom"
                    anchor={{ to: "bottom end" }}
                    className="w-[var(--button-width)] rounded-xl border border-white/5 bg-white/5 backdrop-blur-[16px] p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none"
                  >
                    {llmOptions.map((option, optionIdx) => (
                      <ListboxOption
                        key={optionIdx}
                        className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                        value={option.label}
                      >
                        <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                        <div className="text-sm/6 text-white">
                          {option.label}
                        </div>
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Transition>
              </Listbox>
            </div>
            {/* Api key */}
            <div className="block rounded-lg py-2 px-3 transition hover:bg-white/5">
              <p className="font-semibold text-white">Api key</p>
              <div className="w-full max-w-md">
                <Field>
                  <Input
                    placeholder="Enter your Api key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className={clsx(
                      " block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                      "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    )}
                  />
                </Field>
              </div>
            </div>
            {/* Prompts */}
            {/* <div className="w-full px-3 flex justify-start gap-3 items-center">
              <p className="text-white">Show prompts: </p>
              <Checkbox
                checked={checked}
                onChange={setChecked}
                className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
              >
                
                <svg
                  className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Checkbox>
            </div> */}

            {/* {checked && (
              <>
            
                <div className="block rounded-lg py-2 px-3 transition hover:bg-white/5">
                  <p className="font-semibold text-white">Prompt</p>
                  <div className="w-full max-w-md">
                    <Field>
                      <Textarea
                        placeholder="Enter prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className={clsx(
                          "block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                          "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                        )}
                        rows={3}
                      />
                    </Field>
                  </div>
                </div>
               
                <div className="block rounded-lg py-2 px-3 transition hover:bg-white/5">
                  <p className="font-semibold text-white">Prompt 2</p>
                  <div className="w-full max-w-md">
                    <Field>
                      <Textarea
                        placeholder="Enter prompt"
                        value={prompt2}
                        onChange={(e) => setPrompt2(e.target.value)}
                        className={clsx(
                          "block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                          "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                        )}
                        rows={3}
                      />
                    </Field>
                  </div>
                </div>
          
                <div className="flex justify-start w-full pt-2 px-4">
                  <Button
                    onClick={handleprompt}
                    className=" inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold text-white border-white/10 border data-[hover]:border-white/25 data-[open]:border-white/25 shadow-inner shadow-white/10 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white"
                  >
                    Default prompt
                  </Button>
                </div>
              </>
            )} */}

            <div className="flex justify-end w-full pt-2 px-4">
              <Button
                type="submit"
                className=" inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold text-white border-white/10 border data-[hover]:border-white/25 data-[open]:border-white/25 shadow-inner shadow-white/10 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white"
              >
                Save changes
              </Button>
            </div>
          </form>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};

export default Configuration;
