"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { createPost, deletePost, updatePost, type NewsPostInput } from "@/lib/news";

function parseInput(formData: FormData): NewsPostInput {
  return {
    title: String(formData.get("title") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    body: String(formData.get("body") ?? "").trim(),
    coverMediaId: formData.get("coverMediaId") ? Number(formData.get("coverMediaId")) : null,
    status: formData.get("status") === "published" ? "published" : "draft",
  };
}

export async function createNewsPost(formData: FormData) {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("Not authenticated.");

  const input = parseInput(formData);
  if (!input.title) throw new Error("Title is required.");

  await createPost(input);
  revalidatePath("/news");
  redirect("/admin/news");
}

export async function updateNewsPost(id: number, formData: FormData) {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("Not authenticated.");

  const input = parseInput(formData);
  if (!input.title) throw new Error("Title is required.");

  await updatePost(id, input);
  revalidatePath("/news");
  redirect("/admin/news");
}

export async function deleteNewsPost(id: number) {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("Not authenticated.");

  await deletePost(id);
  revalidatePath("/news");
  revalidatePath("/admin/news");
}
