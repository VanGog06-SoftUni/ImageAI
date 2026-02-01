#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::env::temp_dir;
use std::path::PathBuf;
use uuid::Uuid;

#[tauri::command]
fn convert_to_grayscale(path: String) -> Result<String, String> {
    // Load the image from the provided path
    let img = image::open(&path).map_err(|e| format!("Failed to open image: {}", e))?;

    // Convert to grayscale
    let grayscale_img = img.grayscale();

    // Generate a unique output path in the temp directory
    let extension = PathBuf::from(&path)
        .extension()
        .and_then(|ext| ext.to_str())
        .unwrap_or("png")
        .to_string();
    let output_filename = format!("imageai_grayscale_{}.{}", Uuid::new_v4(), extension);
    let output_path = temp_dir().join(output_filename);

    // Save the grayscale image
    grayscale_img
        .save(&output_path)
        .map_err(|e| format!("Failed to save grayscale image: {}", e))?;

    // Return the output path as a string
    output_path
        .to_str()
        .map(|s| s.to_string())
        .ok_or_else(|| "Failed to convert output path to string".to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![convert_to_grayscale])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
