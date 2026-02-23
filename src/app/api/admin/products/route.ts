import { NextRequest, NextResponse } from "next/server";
import { addProduct, deleteProduct, updateProduct } from "@/lib/products";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, category, imageUrl } = body;

    if (!name || !description) {
      return NextResponse.json(
        { error: "Name and description are required" },
        { status: 400 }
      );
    }

    const product = await addProduct({
      name: String(name).trim(),
      description: String(description).trim(),
      category: String(category || "Software").trim(),
      imageUrl: imageUrl ? String(imageUrl).trim() : undefined,
    });

    return NextResponse.json(product);
  } catch (err) {
    console.error("Add product error:", err);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, description, category, imageUrl } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Product ID required" },
        { status: 400 }
      );
    }

    const updates: Partial<{ name: string; description: string; category: string; imageUrl?: string }> = {};
    if (name !== undefined) updates.name = String(name).trim();
    if (description !== undefined) updates.description = String(description).trim();
    if (category !== undefined) updates.category = String(category).trim();
    if (imageUrl !== undefined) updates.imageUrl = imageUrl ? String(imageUrl).trim() : undefined;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "At least one field to update is required" },
        { status: 400 }
      );
    }

    const product = await updateProduct(String(id), updates);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (err) {
    console.error("Update product error:", err);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }
    const ok = await deleteProduct(id);
    if (!ok) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete product error:", err);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
