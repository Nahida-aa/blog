"use client";
import React, { useMemo, useState } from "react";
import { SelectItem, type SharedSelection } from "@heroui/react";
import { Select as SelectByHeroui } from "@/app/a/ui/form/input";
import { Plus } from "lucide-react";
import { Button } from "@/components/aui/button";
import { Modal } from "@/app/a/modal/_comp/Modal";

import {
  Modal as HeroModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { Select } from "@/app/a/ui/form/select";
import { Field } from "@/components/ui/field";
import { Pre } from "@/app/a/ui/base/html";

export const animals = [
  { value: "cat", label: "Cat" },
  { value: "dog", label: "Dog" },
  { value: "elephant", label: "Elephant" },
  { value: "lion", label: "Lion" },
  { value: "tiger", label: "Tiger" },
  { value: "giraffe", label: "Giraffe" },
  { value: "dolphin", label: "Dolphin" },
  { value: "penguin", label: "Penguin" },
  { value: "zebra", label: "Zebra" },
  { value: "shark", label: "Shark" },
  { value: "whale", label: "Whale" },
  { value: "otter", label: "Otter" },
  { value: "crocodile", label: "Crocodile" },
  { value: "同学", label: "同学" },
];

export default function App() {
  const [open, setOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [value, setValue] = useState(null);
  const [touched, setTouched] = useState(false);

  // const isValid = value.has("cat");
  const isValid = useMemo(() => {
    return value === "cat";
  }, [value]);
  const invalid = !isValid;

  return (
    <main className="w-full">
      <Button onPress={() => setOpen(true)} startContent={<Plus />}>
        创建分组
      </Button>
      <Modal open={open} onOpenChange={setOpen}>
        <SelectByHeroui
          className="max-w-xs"
          // description="The second most popular pet in the world"
          errorMessage={isValid || !touched ? "" : "You must select a cat"}
          isInvalid={isValid || !touched ? false : true}
          label="Favorite Animal"
          options={animals}
          // selectedKeys={value}
          value={value}
          // onClose={() => setTouched(true)}
          onChange={(v) => {}}
          // onSelectionChange={(keys: SharedSelection) => {
          //   console.log(keys);
          //   if (keys instanceof Set) {
          //     const newKeys = Array.from(keys);
          //     setValue(newKeys[0])
          //   } else {
          //   }
          //   // new Set([...keys])
          // }}
        />

        <Select
          options={animals}
          name="animal"
          invalid={!isValid}
          value={value}
          onChange={setValue}
        />
        <Pre json={value} />
      </Modal>
      <SelectByHeroui
        className="max-w-xs"
        // description="The second most popular pet in the world"
        errorMessage={isValid || !touched ? "" : "You must select a cat"}
        isInvalid={isValid || !touched ? false : true}
        label="Favorite Animal"
        options={animals}
        // selectedKeys={value}
        value={value}
        // onClose={() => setTouched(true)}
        onChange={(v) => {}}
        // onSelectionChange={(keys: SharedSelection) => {
        //   console.log(keys);
        //   if (keys instanceof Set) {
        //     const newKeys = Array.from(keys);
        //     setValue(newKeys[0])
        //   } else {
        //   }
        //   // new Set([...keys])
        // }}
      />
      <Button onPress={onOpen}>Open Modal</Button>
      <HeroModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <Select
                  className="max-w-xs"
                  // description="The second most popular pet in the world"
                  errorMessage={
                    isValid || !touched ? "" : "You must select a cat"
                  }
                  isInvalid={isValid || !touched ? false : true}
                  label="Favorite Animal"
                  options={animals}
                  // selectedKeys={value}
                  value={value}
                  // onClose={() => setTouched(true)}
                  onChange={(v) => {}}
                  // onSelectionChange={(keys: SharedSelection) => {
                  //   console.log(keys);
                  //   if (keys instanceof Set) {
                  //     const newKeys = Array.from(keys);
                  //     setValue(newKeys[0])
                  //   } else {
                  //   }
                  //   // new Set([...keys])
                  // }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </HeroModal>
    </main>
  );
}
