"use client";

import { authClient } from "@/lib/auth-client";
import {
  AlertDialog,
  Button,
} from "@heroui/react";

import { Trash2 } from "lucide-react";

import toast from "react-hot-toast";

export function DeleteAlert({
  room,
  onDelete,
}) {

  // DELETE ROOM
  const handleDelete = async () => {
      try {

        const { data: tokenData } = await authClient.token();
        console.log(tokenData);

        const response =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/rooms/${room._id}`,
            {
              method: "DELETE",
              headers: {
                authorization: `Bearer ${tokenData?.token}`,
              },
            }
          );

        const data =
          await response.json();

        if (
          data.deletedCount > 0
        ) {
          toast.success(
            "Room deleted successfully"
          );

          // REMOVE FROM UI
          onDelete(room._id);
        } else {
          toast.error(
            "Delete failed"
          );
        }
      } catch (error) {
        console.log(error);

        toast.error(
          "Something went wrong"
        );
      }
    };

  return (
    <AlertDialog>
      {/* OPEN BUTTON */}
      <AlertDialog.Trigger>
        <button
          className="inline-flex items-center justify-center rounded-2xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-400"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </AlertDialog.Trigger>

      {/* MODAL */}
      <AlertDialog.Backdrop className="bg-black/60 backdrop-blur-sm">
        <AlertDialog.Container>
          <AlertDialog.Dialog className="w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-900 p-6 text-white shadow-2xl">
            {/* HEADER */}
            <AlertDialog.Header>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/20">
                  <Trash2 className="h-6 w-6 text-red-400" />
                </div>

                <div>
                  <AlertDialog.Heading className="text-xl font-bold">
                    Delete Room?
                  </AlertDialog.Heading>

                  <p className="mt-1 text-sm text-slate-400">
                    This action cannot
                    be undone.
                  </p>
                </div>
              </div>
            </AlertDialog.Header>

            {/* BODY */}
            <AlertDialog.Body className="mt-6">
              <p className="leading-7 text-slate-300">
                Are you deleting{" "}
                <span className="font-bold text-white">
                  {room.roomName}
                </span>{" "}
                <span>permanently?</span>
              </p>
            </AlertDialog.Body>

            {/* FOOTER */}
            <AlertDialog.Footer className="mt-8 flex justify-end gap-3">
              <Button
                slot="close"
                variant="bordered"
                className="border-white/10 text-white"
              >
                Cancel
              </Button>

              <Button
                slot="close"
                color="danger"
                onPress={
                  handleDelete
                }
              >
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}