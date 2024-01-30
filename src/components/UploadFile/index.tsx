import { Button, Icon } from "@/components";

import clsx from "clsx";
import { convertBytesToMegas } from "@/utils";

export const UploadFile = ({
  file,
  handleFileUpload,
  handleDeleteFile,
}: {
  file: File | null;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteFile: () => void;
}) => {
  return (
    <div className="mx-auto w-full">
      <div className="flex w-full flex-col justify-center gap-2">
        {file ? (
          <div
            className={clsx(
              "ch-input-background flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border"
            )}
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <p className="ch-input-text-mega font-bold">
                {file.name}{" "}
                <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                  ({convertBytesToMegas(file.size)}MB)
                </span>
              </p>
              <div className="relative pt-2">
                <Button
                  label="Delete"
                  size="sm"
                  type="secondary"
                  onClick={handleDeleteFile}
                  className="ch-button-alert"
                />
              </div>
            </div>
          </div>
        ) : (
          <label
            htmlFor={"fileInput"}
            className={clsx(
              "ch-input-background flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border"
            )}
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <div className="rounded-md border p-2.5">
                <Icon
                  name="alert-circle"
                  className="ch-input-text-mega ch-input-stroke"
                  size={20}
                />
              </div>
              <p className="ch-input-text-mega mt-3">
                <span className="font-semibold">Upload CSV File</span>
              </p>
            </div>
            <input
              id={"fileInput"}
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              accept={"csv"}
            />
          </label>
        )}
      </div>
    </div>
  );
};
