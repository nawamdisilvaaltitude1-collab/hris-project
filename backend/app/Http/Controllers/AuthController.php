<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'regex:/^[\w\.\-]+@altitude1\.com$/',
                'unique:users'
            ],
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Validate company email domain
        if (!str_ends_with($validated['email'], '@altitude1.com')) {
            return response()->json(['error' => 'Email must be @altitude1.com'], 422);
        }

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'status' => 'pending',
            'role' => 'employee',
        ]);

        return response()->json(['message' => 'Registration submitted for approval.'], 201);
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        if ($user->status !== 'approved') {
            return response()->json(['error' => 'Account not approved'], 403);
        }

        return response()->json(['user' => $user], 200);
    }
}